import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const ALLOWED_ORIGINS = [
  "https://templemotherearth.lovable.app",
  "https://templemotherearth.org",
  "http://localhost:8080",
  "http://localhost:5173",
];

const getCorsHeaders = (req: Request) => {
  const origin = req.headers.get("origin") || "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
};

// Map Stripe price IDs to membership tier names
const PRICE_TO_TIER: Record<string, string> = {
  "price_1T050aIsbHRagMNSiz4udrdB": "community-rhythm",
  "price_1T050cIsbHRagMNSBTyAojHz": "environment-collective",
  "price_1T050eIsbHRagMNSnIWAtIby": "preparation-path",
  "price_1T050gIsbHRagMNSb6oS6Xzl": "temple-immersion",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    let event: Stripe.Event;

    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      logStep("Webhook signature verified");
    } else {
      event = JSON.parse(body) as Stripe.Event;
      logStep("Processing event without signature verification");
    }

    logStep("Event received", { type: event.type, id: event.id });

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_details?.email || session.customer_email;
        logStep("Checkout completed", { email: customerEmail });

        if (customerEmail && session.mode === "subscription") {
          const subscriptionId = session.subscription as string;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const priceId = subscription.items.data[0]?.price?.id;
          const tier = priceId ? PRICE_TO_TIER[priceId] || "community-rhythm" : "community-rhythm";

          logStep("Updating membership tier", { email: customerEmail, tier, priceId });

          const { error } = await supabase
            .from("profiles")
            .update({ membership_tier: tier })
            .eq("email", customerEmail);

          if (error) {
            logStep("ERROR updating profile", { error: error.message });
          } else {
            logStep("Profile updated successfully");
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const customer = await stripe.customers.retrieve(customerId);
        const email = (customer as Stripe.Customer).email;

        if (email) {
          const priceId = subscription.items.data[0]?.price?.id;
          const tier = priceId ? PRICE_TO_TIER[priceId] || "community-rhythm" : "community-rhythm";
          const isActive = subscription.status === "active";

          logStep("Subscription updated", { email, tier, status: subscription.status });

          const { error } = await supabase
            .from("profiles")
            .update({ membership_tier: isActive ? tier : "seeker" })
            .eq("email", email);

          if (error) logStep("ERROR updating profile", { error: error.message });
          else logStep("Profile tier updated");
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const customer = await stripe.customers.retrieve(customerId);
        const email = (customer as Stripe.Customer).email;

        if (email) {
          logStep("Subscription canceled", { email });

          const { error } = await supabase
            .from("profiles")
            .update({ membership_tier: "seeker" })
            .eq("email", email);

          if (error) logStep("ERROR resetting profile", { error: error.message });
          else logStep("Profile reset to seeker");
        }
        break;
      }

      default:
        logStep("Unhandled event type", { type: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: msg });
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

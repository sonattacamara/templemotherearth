import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Loader2, ArrowLeft, Shield, RefreshCw, ExternalLink, Copy, Check } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

interface HealthCheck {
  status: "pass" | "fail" | "warn";
  message: string;
}

interface HealthResponse {
  healthy: boolean;
  checks: Record<string, HealthCheck>;
  timestamp: string;
}

const WEBHOOK_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/stripe-webhook`;

const SETUP_STEPS = [
  {
    id: "stripe_secret_key",
    title: "Stripe Secret Key",
    description: "Your live or test STRIPE_SECRET_KEY must be stored as a backend secret.",
  },
  {
    id: "webhook_secret",
    title: "Webhook Signing Secret",
    description: "The STRIPE_WEBHOOK_SECRET (whsec_...) verifies that events come from Stripe, not a bad actor.",
  },
  {
    id: "stripe_api",
    title: "Stripe API Connectivity",
    description: "Confirms the edge function can reach Stripe's API using your secret key.",
  },
  {
    id: "supabase_env",
    title: "Backend Environment",
    description: "SUPABASE_URL and SERVICE_ROLE_KEY are needed to update member profiles on webhook events.",
  },
  {
    id: "webhook_endpoint",
    title: "Webhook Endpoint Deployed",
    description: "The stripe-webhook edge function is deployed and reachable.",
  },
];

const EVENTS_HANDLED = [
  { event: "checkout.session.completed", desc: "Assigns membership tier after successful subscription checkout." },
  { event: "customer.subscription.updated", desc: "Updates tier when a subscription plan changes or status changes." },
  { event: "customer.subscription.deleted", desc: "Resets member to 'seeker' tier on cancellation." },
];

const StatusIcon = ({ status }: { status: "pass" | "fail" | "warn" | "pending" }) => {
  if (status === "pass") return <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />;
  if (status === "fail") return <XCircle className="h-5 w-5 text-destructive shrink-0" />;
  if (status === "warn") return <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />;
  return <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 shrink-0" />;
};

const WebhookChecklist = () => {
  const { user, loading: authLoading } = useAuth();
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const runHealthCheck = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("webhook-health");
      if (fnError) throw fnError;
      setHealthData(data as HealthResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Health check failed");
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = async () => {
    await navigator.clipboard.writeText(WEBHOOK_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/member/auth" replace />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Webhook Setup Checklist" description="Stripe webhook configuration and health status for Temple Mother Earth." path="/webhook-checklist" />
      <Navigation />

      <section className="px-4 pt-28 pb-20">
        <motion.div className="mx-auto max-w-3xl" initial="hidden" animate="visible" variants={stagger}>
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-2">
            <Link to="/analytics" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Analytics
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="font-display text-3xl font-bold text-foreground">Stripe Webhook Checklist</h1>
          </motion.div>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-8">
            Verify that your Stripe webhook is securely configured, deployed, and ready to process subscription events.
          </motion.p>

          {/* Webhook URL */}
          <motion.div variants={fadeUp} className="rounded-xl border border-border bg-card p-5 mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Webhook Endpoint URL</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm text-foreground break-all font-mono">
                {WEBHOOK_URL}
              </code>
              <button
                onClick={copyUrl}
                className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition"
                aria-label="Copy URL"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Paste this URL in your{" "}
              <a
                href="https://dashboard.stripe.com/webhooks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                Stripe Dashboard → Webhooks <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </motion.div>

          {/* Run Health Check */}
          <motion.div variants={fadeUp} className="mb-8">
            <button
              onClick={runHealthCheck}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              {loading ? "Running checks…" : "Run Health Check"}
            </button>
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
            {healthData && (
              <p className="mt-3 text-xs text-muted-foreground">
                Last checked: {new Date(healthData.timestamp).toLocaleString()}
              </p>
            )}
          </motion.div>

          {/* Checklist */}
          <motion.div variants={fadeUp} className="space-y-3 mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">Configuration Checklist</h2>
            {SETUP_STEPS.map((step) => {
              const check = healthData?.checks[step.id];
              return (
                <div
                  key={step.id}
                  className={`rounded-xl border p-4 transition ${
                    check?.status === "pass"
                      ? "border-green-500/30 bg-green-500/5"
                      : check?.status === "fail"
                      ? "border-destructive/30 bg-destructive/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <StatusIcon status={check?.status || "pending"} />
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">{step.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                      {check && (
                        <p className={`text-xs mt-1 ${check.status === "pass" ? "text-green-600" : check.status === "fail" ? "text-destructive" : "text-yellow-600"}`}>
                          {check.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Overall Status */}
          {healthData && (
            <motion.div
              variants={fadeUp}
              className={`rounded-xl border p-5 mb-10 text-center ${
                healthData.healthy
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-destructive/30 bg-destructive/5"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {healthData.healthy ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <span className="font-display text-lg font-bold text-green-600">All Systems Go</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-destructive" />
                    <span className="font-display text-lg font-bold text-destructive">Action Required</span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {healthData.healthy
                  ? "Your Stripe webhook is fully configured and secure."
                  : "One or more checks failed. Review the items above."}
              </p>
            </motion.div>
          )}

          {/* Events Handled */}
          <motion.div variants={fadeUp}>
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">Events Handled</h2>
            <div className="space-y-3">
              {EVENTS_HANDLED.map((evt) => (
                <div key={evt.event} className="rounded-xl border border-border bg-card p-4">
                  <code className="text-sm font-mono text-primary">{evt.event}</code>
                  <p className="text-xs text-muted-foreground mt-1">{evt.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Setup Instructions */}
          <motion.div variants={fadeUp} className="mt-10 rounded-xl border border-primary/15 bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">Quick Setup Guide</h2>
            <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
              <li>
                Go to{" "}
                <a href="https://dashboard.stripe.com/webhooks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Stripe Dashboard → Webhooks
                </a>{" "}
                and click <strong className="text-foreground">"Add endpoint"</strong>.
              </li>
              <li>Paste the webhook URL shown above.</li>
              <li>
                Select these events: <code className="text-xs bg-muted px-1 rounded">checkout.session.completed</code>,{" "}
                <code className="text-xs bg-muted px-1 rounded">customer.subscription.updated</code>,{" "}
                <code className="text-xs bg-muted px-1 rounded">customer.subscription.deleted</code>.
              </li>
              <li>
                Copy the <strong className="text-foreground">Signing secret</strong> (starts with <code className="text-xs bg-muted px-1 rounded">whsec_</code>) and store it as the <code className="text-xs bg-muted px-1 rounded">STRIPE_WEBHOOK_SECRET</code> backend secret.
              </li>
              <li>Click <strong className="text-foreground">"Run Health Check"</strong> above to verify everything is connected.</li>
              <li>
                Use{" "}
                <a href="https://dashboard.stripe.com/test/webhooks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Stripe's test mode
                </a>{" "}
                to send test events and confirm they are processed correctly.
              </li>
            </ol>
          </motion.div>
        </motion.div>
      </section>

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WebhookChecklist;

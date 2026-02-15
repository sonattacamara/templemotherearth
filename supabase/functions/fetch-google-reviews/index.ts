import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      throw new Error("GOOGLE_PLACES_API_KEY is not configured");
    }

    // Dynamically find the Place ID using Find Place endpoint
    const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Temple+Mother+Earth&inputtype=textquery&fields=place_id&locationbias=circle:50000@38.85,-76.93&key=${apiKey}`;
    const findRes = await fetch(findUrl);
    const findData = await findRes.json();

    if (findData.status !== "OK" || !findData.candidates?.length) {
      throw new Error(`Could not find Place ID: ${findData.status} - ${findData.error_message || "No candidates found"}`);
    }

    const placeId = findData.candidates[0].place_id;
    console.log("Resolved Place ID:", placeId);

    // Use Places API (New) for place details with reviews
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,rating,userRatingCount,reviews&key=${apiKey}`;

    const response = await fetch(url, {
      headers: {
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
      },
    });

    if (!response.ok) {
      // Fallback to legacy API
      const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;
      const legacyResponse = await fetch(legacyUrl);
      const legacyData = await legacyResponse.json();

      if (legacyData.status !== "OK") {
        throw new Error(`Google Places API error: ${legacyData.status} - ${legacyData.error_message || "Unknown error"}`);
      }

      const result = legacyData.result;
      return new Response(
        JSON.stringify({
          name: result.name,
          rating: result.rating,
          totalReviews: result.user_ratings_total,
          reviews: (result.reviews || []).map((r: any) => ({
            author: r.author_name,
            rating: r.rating,
            text: r.text,
            time: r.time,
            profilePhoto: r.profile_photo_url,
            relativeTime: r.relative_time_description,
          })),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    return new Response(
      JSON.stringify({
        name: data.displayName?.text || "Temple Mother Earth",
        rating: data.rating,
        totalReviews: data.userRatingCount,
        reviews: (data.reviews || []).map((r: any) => ({
          author: r.authorAttribution?.displayName || "Anonymous",
          rating: r.rating,
          text: r.text?.text || "",
          time: r.publishTime ? new Date(r.publishTime).getTime() / 1000 : 0,
          profilePhoto: r.authorAttribution?.photoUri || "",
          relativeTime: r.relativePublishTimeDescription || "",
        })),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, width = 1024, height = 1024 } = await req.json();

    const POLLINATIONS_API_KEY = Deno.env.get("POLLINATIONS_API_KEY");

    if (!POLLINATIONS_API_KEY) {
      throw new Error("POLLINATIONS_API_KEY is not configured");
    }

    // Pollinations.ai image generation API
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&private=true&key=${POLLINATIONS_API_KEY}`;

    // Verify the image URL is accessible
    const checkResponse = await fetch(imageUrl, { method: "HEAD" });
    
    if (!checkResponse.ok) {
      throw new Error("Failed to generate image");
    }

    return new Response(
      JSON.stringify({
        imageUrl,
        success: true,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Generate image error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to generate image",
        success: false,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

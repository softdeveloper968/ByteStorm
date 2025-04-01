import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req) {
  try {
    // Parse URL parameters
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "MustWants Blog";
    const imageUrl = searchParams.get("image");

    // Validate image URL
    if (!imageUrl || !imageUrl.startsWith("http")) {
      throw new Error("Invalid or missing image URL");
    }

    // // Fetch the image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    // // Convert image to ArrayBuffer
    const imageData = await imageResponse.arrayBuffer();

    return new ImageResponse(
      (
        <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "black",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
        // className="flex w-full h-full relative bg-black text-white justify-center items-center"
      >
          {/* Render the fetched image */}
          <img width={1200} height={630} src={imageData}/>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG Image Generation Error:", error.message);
    return new Response("Error generating OG image", { status: 500 });
  }
}

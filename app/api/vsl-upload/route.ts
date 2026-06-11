import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { type NextRequest, NextResponse } from "next/server"

// Client-upload handshake route — the file streams directly from the browser
// to Vercel Blob (no 4.5MB server route limit, no recompression of the 4K source).
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ["video/mp4", "video/quicktime", "video/webm"],
          // allow large 4K files
          maximumSizeInBytes: 2 * 1024 * 1024 * 1024, // 2 GB
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ pathname }),
        }
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("[v0] VSL upload completed:", blob.url)
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error("[v0] VSL upload error:", error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}

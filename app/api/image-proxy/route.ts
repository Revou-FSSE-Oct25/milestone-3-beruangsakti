import { NextRequest, NextResponse } from 'next/server';

/**
 * Image Proxy API Route
 *
 * Proxies images from fakestoreapi.com to fix CORB (Cross-Origin Read Blocking) issues.
 *
 * Problem: fakestoreapi.com returns wrong Content-Type header (text/html instead of image/jpeg)
 * Solution: This proxy fetches the image and returns it with the correct Content-Type
 *
 * Usage: /api/image-proxy?url=https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get('url');

  // Validate URL parameter
  if (!imageUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Security: Only allow images from fakestoreapi.com
  if (!imageUrl.startsWith('https://fakestoreapi.com/img/')) {
    return NextResponse.json(
      { error: 'Invalid URL: Only fakestoreapi.com images are allowed' },
      { status: 403 }
    );
  }

  try {
    // Fetch image from fakestoreapi.com
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Get image data
    const imageBuffer = await response.arrayBuffer();

    // Determine Content-Type from URL extension
    let contentType = 'image/jpeg';
    if (imageUrl.endsWith('.png')) {
      contentType = 'image/png';
    } else if (imageUrl.endsWith('.gif')) {
      contentType = 'image/gif';
    } else if (imageUrl.endsWith('.webp')) {
      contentType = 'image/webp';
    }

    // Return image with correct Content-Type header
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

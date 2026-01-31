import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Use Node.js runtime (not Edge)
export const dynamic = 'force-dynamic';

/**
 * API Route Proxy for fakestoreapi.com (all products)
 *
 * This proxy exists to bypass Cloudflare bot protection that blocks
 * direct requests from Vercel serverless functions.
 *
 * Server-to-server requests with proper headers are less likely to be blocked.
 */
export async function GET() {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'GET',
      headers: {
        // Add browser-like headers to appear legitimate
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': 'https://fakestoreapi.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
      },
      cache: 'force-cache', // Cache for static generation
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: 'Failed to fetch products',
          status: response.status,
          statusText: response.statusText,
          details: errorText.substring(0, 200),
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Proxy request failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

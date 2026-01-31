import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const API_BASE_URL = 'https://fakestoreapi.com';

  try {
    const response = await fetch(`${API_BASE_URL}/products/1`, {
      cache: 'no-store',
    });

    const responseText = await response.text();

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      bodyLength: responseText.length,
      bodyPreview: responseText.substring(0, 200),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}

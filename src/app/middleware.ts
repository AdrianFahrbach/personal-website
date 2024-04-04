import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server.js';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Loads the Spline files earlier by preconnecting to the domain
  response.headers.append('Link', '<https://prod.spline.design>; rel=preconnect;');

  return response;
}

export const config = {
  matcher: '/:path*',
};

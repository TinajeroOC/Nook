import { NextResponse } from 'next/server'

import { initPocketBaseServer } from './lib/pocketbase/initPocketBaseServer'

export async function middleware(request) {
  const pb = await initPocketBaseServer()
  const isAuthenticated = pb.authStore.isValid

  if (isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/'

    return NextResponse.rewrite(url)
  }
}

export const config = {
  matcher: ['/login', '/signup', '/dashboard/:path*'],
}

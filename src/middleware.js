import { NextResponse } from 'next/server'

import { initPocketBaseServer } from '@/lib/pocketbase'

export async function middleware(request) {
  const pb = await initPocketBaseServer()
  const isAuthenticated = pb.authStore.isValid

  if (request.nextUrl.pathname.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin))
  }

  if (!request.nextUrl.pathname.startsWith('/dashboard') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin))
  }
}

export const config = {
  matcher: ['/login', '/signup', '/dashboard/:path*'],
}

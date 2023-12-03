import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { initPocketBaseServer } from '@/lib/pocketbase/initPocketBaseServer'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    const pb = await initPocketBaseServer()

    const result = await pb.collection('users').authWithPassword(email, password)

    cookies().set('pb_auth', pb.authStore.exportToCookie())

    return NextResponse.json(result)
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || error.toString() }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

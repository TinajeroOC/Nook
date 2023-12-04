import { NextResponse } from 'next/server'

import { initPocketBaseServer } from '@/lib/pocketbase/initPocketBaseServer'

export async function POST(request) {
  try {
    const { name, username, email, password } = await request.json()
    const pb = await initPocketBaseServer()

    const result = await pb
      .collection('users')
      .create({ name, username, email, password, passwordConfirm: password })

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

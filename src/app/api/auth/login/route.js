import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

import pb from '@/lib/pocketbase/initPocketBase';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const { record, token } = await pb.login(email, password);

    record.token = token;
    cookies().set('pb_auth', pb.client.authStore.exportToCookie());

    return NextResponse.json(record);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || error.toString() }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
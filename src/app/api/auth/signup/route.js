import { NextResponse } from "next/server";

import pb from "@/lib/pocketbase/initPocketBase";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    const result = await pb.register(name, email, password);

    return NextResponse.json(result);
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
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { DJANGO_API_URL } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['DOCTOR', 'STUDENT'].includes((session.user as any).role)) {
      return NextResponse.json({ error: "Unauthorized. Only medical professionals can answer." }, { status: 401 });
    }

    const { questionId, content } = await req.json();

    if (!questionId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Proxy POST to Django
    const djangoRes = await fetch(`${DJANGO_API_URL}/api/forum/answers/`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${(session.user as any).accessToken}`
      },
      body: JSON.stringify({
        question: parseInt(questionId, 10),
        content,
        is_verified: (session.user as any).role === 'DOCTOR'
      })
    });

    if (!djangoRes.ok) {
       const errData = await djangoRes.json();
       return NextResponse.json({ error: "Django Proxy Error", details: errData }, { status: 400 });
    }

    const data = await djangoRes.json();
    return NextResponse.json({ success: true, answer: data });
  } catch (error) {
    console.error("API proxy error creating answer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

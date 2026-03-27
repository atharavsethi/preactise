import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, category, anonymous } = await req.json();

    if (!title || !description || !category) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Proxy POST to Django
    const djangoRes = await fetch("http://localhost:8000/api/forum/questions/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${(session.user as any).accessToken}`
      },
      body: JSON.stringify({
        title,
        content: description,
        category,
        is_anonymous: anonymous
      })
    });

    if (!djangoRes.ok) {
       const errData = await djangoRes.json();
       return NextResponse.json({ error: "Django Proxy Error", details: errData }, { status: 400 });
    }

    const data = await djangoRes.json();
    return NextResponse.json({ success: true, question: data });
  } catch (error) {
    console.error("API proxy error creating question:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

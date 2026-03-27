import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).accessToken) {
      return NextResponse.json({ error: "Must be logged in to upvote." }, { status: 401 });
    }
    
    // Extra await since Next 15
    const p = await Promise.resolve(params);

    // Proxy UPVOTE POST to Django
    const djangoRes = await fetch(`http://localhost:8000/api/forum/answers/${p.id}/upvote/`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${(session.user as any).accessToken}`
      }
    });

    if (!djangoRes.ok) {
       return NextResponse.json({ error: "Django Proxy Error" }, { status: 400 });
    }

    const data = await djangoRes.json();
    return NextResponse.json({ upvotes: data.upvotes });
  } catch (error) {
    console.error("API proxy error upvoting:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

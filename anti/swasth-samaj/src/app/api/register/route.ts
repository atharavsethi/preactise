import { NextResponse } from 'next/server';
import { DJANGO_API_URL } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { email, password, name, role, medicalLicense, specialty } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Proxy the registration to the Django DRF Backend
    const djangoRes = await fetch(`${DJANGO_API_URL}/api/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
        role,
        medical_license: medicalLicense,
        specialty
      })
    });

    const data = await djangoRes.json();

    if (!djangoRes.ok) {
      return NextResponse.json({ error: data.email ? "Email already exists" : "Registration failed" }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: data });
  } catch (error) {
    console.error("Django Register API Proxy Error: ", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

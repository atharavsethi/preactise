import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password, role, credentialUrl } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const validRole = ['USER', 'STUDENT', 'DOCTOR'].includes(role) ? role : 'USER';
    
    // Automatically set verified to false for students/doctors. General users are true by default.
    const isVerified = validRole === 'USER'; 

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: validRole,
        credentialUrl: credentialUrl || null,
        isVerified
      }
    });

    return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

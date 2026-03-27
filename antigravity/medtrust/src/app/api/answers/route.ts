import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const role = (session.user as any).role;
    if (role !== 'DOCTOR' && role !== 'STUDENT' && role !== 'ADMIN') {
       return NextResponse.json({ message: 'Only verified medical professionals can answer' }, { status: 403 });
    }

    const { questionId, content } = await req.json();

    const answer = await prisma.answer.create({
      data: {
        content,
        questionId,
        authorId: (session.user as any).id,
        isModerated: false // Goes to admin queue
      }
    });

    return NextResponse.json(answer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

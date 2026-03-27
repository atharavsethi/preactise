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

    const { title, description, category, imageUrl } = await req.json();

    const question = await prisma.question.create({
      data: {
        title,
        description,
        category,
        imageUrl: imageUrl || null,
        status: 'PENDING',
        authorId: (session.user as any).id
      }
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error('Create Question Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  
  try {
    const questions = await prisma.question.findMany({
      where: category ? { category } : undefined,
      include: {
        author: { select: { name: true, role: true } },
        answers: { where: { isModerated: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching questions' }, { status: 500 });
  }
}

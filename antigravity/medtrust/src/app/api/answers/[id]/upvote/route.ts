import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  try {
    const answer = await prisma.answer.update({
      where: { id: resolvedParams.id },
      data: { upvotes: { increment: 1 } }
    });
    return NextResponse.json({ upvotes: answer.upvotes });
  } catch (error) {
    return NextResponse.json({ message: 'Error upvoting' }, { status: 500 });
  }
}

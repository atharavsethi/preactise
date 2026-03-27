'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveAnswer(answerId: string) {
  await prisma.answer.update({ where: { id: answerId }, data: { isModerated: true } });
  revalidatePath('/admin');
  revalidatePath('/questions');
}

export async function rejectAnswer(answerId: string) {
  await prisma.answer.delete({ where: { id: answerId } });
  revalidatePath('/admin');
}

export async function verifyUser(userId: string) {
  await prisma.user.update({ where: { id: userId }, data: { isVerified: true } });
  revalidatePath('/admin');
}

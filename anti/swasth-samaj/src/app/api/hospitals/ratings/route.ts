import { NextResponse } from 'next/server';

// Simple in-memory storage for demonstration purposes
const ratingsStore: Record<string, { totalRating: number; count: number }> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');
  
  if (!ids) {
    return NextResponse.json({ error: 'Missing ids parameter' }, { status: 400 });
  }
  
  const idArray = ids.split(',');
  const result: Record<string, number> = {};
  
  for (const id of idArray) {
    if (ratingsStore[id] && ratingsStore[id].count > 0) {
      result[id] = ratingsStore[id].totalRating / ratingsStore[id].count;
    } else {
      result[id] = 0; // Default rating
    }
  }
  
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { id, rating } = data;
    
    if (!id || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    
    if (!ratingsStore[id]) {
      ratingsStore[id] = { totalRating: 0, count: 0 };
    }
    
    ratingsStore[id].totalRating += rating;
    ratingsStore[id].count += 1;
    
    return NextResponse.json({ 
      success: true, 
      newAverage: ratingsStore[id].totalRating / ratingsStore[id].count 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

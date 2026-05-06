import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomDetect from '@/models/CustomDetect';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    // Return only active detects for the C++ Scanner to pull
    const detects = await CustomDetect.find({ isActive: true }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    return NextResponse.json(detects);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar config' }, { status: 500 });
  }
}
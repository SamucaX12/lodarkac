import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomDetect from '@/models/CustomDetect';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const detects = await CustomDetect.find().sort({ createdAt: -1 });
    return NextResponse.json(detects);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar detects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newDetect = await CustomDetect.create(body);
    return NextResponse.json(newDetect, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar detect' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
    
    await dbConnect();
    await CustomDetect.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar detect' }, { status: 500 });
  }
}
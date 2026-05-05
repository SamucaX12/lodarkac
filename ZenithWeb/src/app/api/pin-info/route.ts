import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Pin from '@/models/Pin';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) return NextResponse.json({ error: 'PIN code required' }, { status: 400 });

  try {
    await dbConnect();
    const pin = await Pin.findOne({ code });
    if (!pin) return NextResponse.json({ error: 'PIN not found' }, { status: 404 });

    return NextResponse.json({ 
      game: pin.game,
      type: pin.type,
      isActive: pin.isActive
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

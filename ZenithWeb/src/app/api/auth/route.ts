import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Pin from '@/models/Pin';

export async function POST(req: Request) {
  await dbConnect();
  
  try {
    const body = await req.json();
    const { pin } = body;
    
    if (!pin || !/^[0-9]{6}$/.test(pin)) {
      return NextResponse.json({ success: false, error: 'Invalid PIN format.' }, { status: 400 });
    }

    // Busca o PIN no banco de dados
    const pinData = await Pin.findOne({ code: pin });
    
    if (!pinData) {
      return NextResponse.json({ success: false, error: 'PIN not found.' }, { status: 404 });
    }

    if (!pinData.isActive) {
      return NextResponse.json({ success: false, error: 'PIN is disabled/expired.' }, { status: 403 });
    }

    // Marca como escaneando
    pinData.isScanning = true;
    await pinData.save();

    // PIN válido
    return NextResponse.json({ 
      success: true, 
      message: 'PIN valid.', 
      data: { type: pinData.type } 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

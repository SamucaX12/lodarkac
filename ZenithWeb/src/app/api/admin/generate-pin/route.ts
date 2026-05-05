import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Pin from '@/models/Pin';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Pegar quem está gerando o PIN
    const authCookie = cookies().get('admin_auth')?.value;
    let ownerKey = 'unknown';
    if (authCookie) {
      const parts = authCookie.split('|');
      if (parts.length >= 4) {
        ownerKey = parts[3]; // Role | Plan | Game | Key
      } else if (parts[0] === 'superadmin') {
        ownerKey = 'samuca244'; // fallback se o cookie for antigo
      }
    }

    // Gera um PIN de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const newPin = await Pin.create({
      code,
      ownerKey,
      clientName: data.clientName || 'Unknown Client',
      game: data.game || 'Free Fire',
      type: data.type || 'Standard',
      isActive: true
    });

    return NextResponse.json({ success: true, pin: newPin });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate PIN' }, { status: 500 });
  }
}

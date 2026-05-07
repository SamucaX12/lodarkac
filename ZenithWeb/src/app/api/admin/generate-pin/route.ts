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
    let createdBy = 'Unknown';
    let allowedGame = 'all';

    if (authCookie) {
      const parts = authCookie.split('|');
      // Format: Role | Plan | Game | OwnerKey | Username
      if (parts[0] === 'superadmin') {
        createdBy = parts[3]; // Username is at parts[3] for superadmin legacy or current
        ownerKey = 'lodark_admin';
        allowedGame = 'all';
      } else if (parts.length >= 5) {
        ownerKey = parts[3];
        createdBy = parts[4];
        allowedGame = parts[2];
      } else if (parts.length >= 4) {
        // Fallback for old cookies
        ownerKey = parts[3];
        createdBy = 'Staff';
        allowedGame = parts[2];
      }
    }

    // Restrição de jogo
    const requestedGame = data.game || 'Free Fire';
    if (allowedGame !== 'all' && allowedGame !== requestedGame) {
       // Se o user só tem FF, não pode gerar FiveM
       // Nota: O model do AdminKey usa 'FF' ou 'FiveM'. O model do Pin usa 'Free Fire' ou 'FiveM'.
       // Vou normalizar.
       const normalizedAllowed = allowedGame === 'FF' ? 'Free Fire' : allowedGame;
       if (normalizedAllowed !== requestedGame) {
          return NextResponse.json({ error: `Você só tem permissão para gerar keys de ${normalizedAllowed}` }, { status: 403 });
       }
    }

    // Gera um PIN de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const newPin = await Pin.create({
      code,
      ownerKey,
      createdBy, // Salvando quem criou
      clientName: data.clientName || 'Unknown Client',
      game: requestedGame,
      type: data.type || 'Standard',
      isActive: true
    });

    return NextResponse.json({ success: true, pin: newPin });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate PIN' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import crypto from 'crypto';

function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Login hardcoded como você pediu para o Super Admin
    if ((username === 'samuca244' || username === 'lodark244' || username === 'lodark' || username === 'samuca') && 
        (password === 'samuca2024' || password === 'lodark2024')) {
      cookies().set({
        name: 'admin_auth',
        value: `superadmin|enterprise|all|${username}`,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias logado
      });
      return NextResponse.json({ success: true, role: 'superadmin' });
    }

    await dbConnect();
    
    // Verifica no banco de usuários
    const hashedPassword = hashPassword(password);
    const userRecord = await User.findOne({ username, password: hashedPassword });

    if (userRecord) {
      // Pega o IP
      userRecord.lastIp = request.headers.get('x-forwarded-for') || 'Unknown';
      await userRecord.save();

      cookies().set({
        name: 'admin_auth',
        value: `${userRecord.role}|${userRecord.plan}|${userRecord.game}|${userRecord.ownerKey}`,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json({ success: true, role: userRecord.role, plan: userRecord.plan, game: userRecord.game });
    }

    return NextResponse.json({ error: 'Usuário ou senha inválidos' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

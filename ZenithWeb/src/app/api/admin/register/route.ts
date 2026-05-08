import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import AdminKey from '@/models/AdminKey';
import crypto from 'crypto';

function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { username, password, email, key, twoFactorEnabled } = await request.json();

    if (!username || !password || !key) {
      return NextResponse.json({ error: 'Preencha Username, Senha e Key' }, { status: 400 });
    }

    await dbConnect();

    // Verifica se a Key existe, tá ativa e não foi usada
    const keyRecord = await AdminKey.findOne({ key: key, isActive: true });
    
    if (!keyRecord) {
      return NextResponse.json({ error: 'Chave de acesso inválida ou inativa' }, { status: 401 });
    }

    if (keyRecord.usedBy) {
      return NextResponse.json({ error: 'Esta chave já foi registrada por outro usuário' }, { status: 401 });
    }

    // Verifica se username já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: 'Nome de usuário já está em uso' }, { status: 400 });
    }

    // Cria o usuário
    const hashedPassword = hashPassword(password);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email: email || '',
      adminKey: key,
      plan: keyRecord.plan,
      game: keyRecord.game,
      role: keyRecord.isSubKey ? 'screenshare' : 'admin', 
      ownerKey: keyRecord.isSubKey ? keyRecord.ownerId : key, 
      twoFactorEnabled: twoFactorEnabled || false,
      lastIp: request.headers.get('x-forwarded-for') || 'Unknown',
    });

    // Atualiza a key para marcar como usada
    keyRecord.usedBy = username;
    await keyRecord.save();

    // Seta o cookie
    cookies().set({
      name: 'admin_auth',
      value: `admin|${keyRecord.plan}|${keyRecord.game}|${key}`,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true, role: 'admin', plan: keyRecord.plan, game: keyRecord.game });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro no servidor ao registrar' }, { status: 500 });
  }
}

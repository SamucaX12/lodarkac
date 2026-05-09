import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminKey from '@/models/AdminKey';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const authCookie = cookies().get('admin_auth')?.value || '';
    const parts = authCookie.split('|');
    const role = parts[0];
    const plan = parts[1];
    const adminKeyString = parts[3] || '';

    if (plan !== 'Enterprise' && role !== 'superadmin') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    // Get owner's record
    const owner = await AdminKey.findOne({ key: adminKeyString });
    if (!owner) {
      return NextResponse.json({ error: 'Dono não encontrado' }, { status: 404 });
    }

    // Check limits
    if (owner.generatedSubKeys >= owner.maxSubKeys) {
      return NextResponse.json({ error: 'Limite de sub-keys atingido' }, { status: 400 });
    }

    // Generate new key
    const newKey = `LDK-TEAM-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // Save sub-key
    await AdminKey.create({
      key: newKey,
      plan: 'Enterprise', // Sub-keys inherit the team plan context
      game: owner.game,
      ownerId: adminKeyString,
      isSubKey: true,
      isActive: true,
    });

    // Update owner count
    owner.generatedSubKeys += 1;
    await owner.save();

    return NextResponse.json({ success: true, key: newKey });
  } catch (error) {
    console.error('Error generating sub-key:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

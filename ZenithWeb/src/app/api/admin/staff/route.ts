import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    const adminAuth = cookies().get('admin_auth')?.value || '';
    if (!adminAuth.startsWith('superadmin') && !adminAuth.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();

    // Atualiza o lastActive de quem está visualizando (se for um user logado no banco)
    const parts = adminAuth.split('|');
    const username = parts[parts.length - 1];
    if (username) {
       await User.findOneAndUpdate({ username }, { lastActive: new Date() });
    }

    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    return NextResponse.json({ users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const adminAuth = cookies().get('admin_auth')?.value || '';
    if (!adminAuth.startsWith('superadmin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { userId, role } = await request.json();
    await dbConnect();
    
    await User.findByIdAndUpdate(userId, { role });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

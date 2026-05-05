import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Ban from '@/models/Ban';

export async function GET() {
  try {
    const adminAuth = cookies().get('admin_auth')?.value || '';
    if (!adminAuth.startsWith('superadmin') && !adminAuth.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const bans = await Ban.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ bans });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bans' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const adminAuth = cookies().get('admin_auth')?.value || '';
    if (!adminAuth.startsWith('superadmin') && !adminAuth.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { target, type, reason, ip } = await request.json();
    if (!target || !type || !reason) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const parts = adminAuth.split('|');
    const bannedBy = parts[parts.length - 1] || 'Admin';

    await dbConnect();
    
    // Deleta ban anterior se existir para o mesmo target
    await Ban.deleteOne({ target });

    const newBan = await Ban.create({
      target,
      type,
      reason,
      ip,
      bannedBy
    });

    return NextResponse.json({ success: true, ban: newBan });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create ban' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const adminAuth = cookies().get('admin_auth')?.value || '';
    if (!adminAuth.startsWith('superadmin')) {
      return NextResponse.json({ error: 'Only superadmins can unban' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await dbConnect();
    await Ban.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete ban' }, { status: 500 });
  }
}

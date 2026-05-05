import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Update from '@/models/Update';

export async function GET() {
  try {
    await dbConnect();
    const updates = await Update.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ updates });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch updates' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const adminAuth = cookies().get('admin_auth')?.value || '';
    if (!adminAuth.startsWith('superadmin') && !adminAuth.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const data = await request.json();
    await dbConnect();

    const parts = adminAuth.split('|');
    const createdBy = parts[parts.length - 1] || 'Admin';

    const newUpdate = await Update.create({
      ...data,
      createdBy
    });

    return NextResponse.json({ success: true, update: newUpdate });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create update' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Pin from '@/models/Pin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    const authCookie = cookies().get('admin_auth')?.value || '';
    const parts = authCookie.split('|');
    const role = parts[0];
    let ownerKey = '';
    if (parts.length >= 4) {
      ownerKey = parts[3];
    } else if (role === 'superadmin') {
      ownerKey = 'samuca244';
    }

    const query = role === 'superadmin' ? {} : { ownerKey };

    const pins = await Pin.find(query).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ pins });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch PINs' }, { status: 500 });
  }
}

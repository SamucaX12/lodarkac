import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Enterprise from '@/models/Enterprise';

const isSuperAdmin = () => {
  const auth = cookies().get('admin_auth')?.value || '';
  return auth.startsWith('superadmin');
};

export async function GET() {
  if (!isSuperAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    let config = await Enterprise.findOne({ configId: 'main' });
    
    if (!config) {
      config = await Enterprise.create({ configId: 'main' });
    }
    
    return NextResponse.json({ privateStrings: config.privateStrings || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isSuperAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const data = await request.json();

    const config = await Enterprise.findOneAndUpdate(
      { configId: 'main' },
      {
        privateStrings: data.privateStrings,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, privateStrings: config.privateStrings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
  }
}

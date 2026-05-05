import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enterprise from '@/models/Enterprise';

export async function GET() {
  try {
    await dbConnect();
    let config = await Enterprise.findOne({ configId: 'main' });
    
    // Se não existir, cria o padrão vazio
    if (!config) {
      config = await Enterprise.create({ configId: 'main' });
    }
    
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    const config = await Enterprise.findOneAndUpdate(
      { configId: 'main' },
      {
        scannerName: data.scannerName,
        primaryColor: data.primaryColor,
        spinnerColor1: data.spinnerColor1,
        spinnerColor2: data.spinnerColor2,
        spinnerColor3: data.spinnerColor3,
        downloadLink: data.downloadLink,
        customStrings: data.customStrings,
        yaraRules: data.yaraRules,
        statusMessages: data.statusMessages,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, config });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
  }
}

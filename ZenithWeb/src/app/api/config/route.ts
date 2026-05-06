import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enterprise from '@/models/Enterprise';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    await dbConnect();
    let config = await Enterprise.findOne({ configId: 'main' });
    
    if (!config) {
      config = await Enterprise.create({ configId: 'main' });
    }
    
    // Retorna apenas os dados que o C++ precisa (sem informações sensíveis)
    return NextResponse.json({
      scannerName: config.scannerName || 'LODARK AC',
      primaryColor: config.primaryColor || '#2563eb',
      spinnerColor1: config.spinnerColor1 || '#ff3366',
      spinnerColor2: config.spinnerColor2 || '#ffaa00',
      spinnerColor3: config.spinnerColor3 || '#33ccff',
      downloadLink: config.downloadLink || '',
      statusMessages: config.statusMessages || [],
      customStrings: config.customStrings || [],
      yaraRules: config.yaraRules || ''
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
}

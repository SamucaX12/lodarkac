import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enterprise from '@/models/Enterprise';
import CustomString from '@/models/CustomString';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    await dbConnect();
    let config = await Enterprise.findOne({ configId: 'main' });
    
    if (!config) {
      config = await Enterprise.create({ configId: 'main' });
    }
    
    const customPatterns = await CustomString.find({ isActive: true });
    
    return NextResponse.json({
      scannerName: config.scannerName || 'LODARK AC',
      primaryColor: config.primaryColor || '#7c3aed',
      spinnerColor1: config.spinnerColor1 || '#ff3366',
      spinnerColor2: config.spinnerColor2 || '#ffaa00',
      spinnerColor3: config.spinnerColor3 || '#33ccff',
      downloadLink: config.downloadLink || '',
      statusMessages: config.statusMessages || [],
      customPatterns: customPatterns.map((s: any) => ({
        process: s.process,
        name: s.clientName,
        value: s.stringValue,
        severity: s.severity
      })),
      yaraRules: config.yaraRules || ''
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
  }
}

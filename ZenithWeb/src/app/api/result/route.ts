import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Result from '@/models/Result';
import Pin from '@/models/Pin';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Buscar o PIN para saber de qual reseller é
    const pinRecord = await Pin.findOne({ code: data.pin });
    const ownerKey = pinRecord ? pinRecord.ownerKey : 'lodark_admin'; // Fallback pro superadmin se n achar

    // Pegar o IP real do client pelo Header da Vercel
    let clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown';
    if (clientIp.includes(',')) {
        clientIp = clientIp.split(',')[0].trim();
    }

    // Injetar o IP real no systemInfo
    if (data.systemInfo) {
      data.systemInfo.ip = clientIp;
    }

    // Check se tá limpo (se os arrays estiverem vazios)
    const isClean = 
      (!data.detections || data.detections.length === 0) &&
      (!data.suspicious || data.suspicious.length === 0);

    // Salva ou atualiza (caso ele scaneie de novo no mesmo PIN)
    const result = await Result.findOneAndUpdate(
      { pin: data.pin },
      {
        pin: data.pin,
        ownerKey,
        isClean,
        detections: data.detections || [],
        warnings: data.warnings || [],
        integrity: data.integrity || [],
        suspicious: data.suspicious || [],
        systemInfo: data.systemInfo || {},
        discordInfo: data.discordInfo || {}
      },
      { upsert: true, new: true }
    );

    // INUTILIZAR O PIN APÓS O USO E REMOVER SCANNING
    if (pinRecord) {
      pinRecord.isActive = false;
      pinRecord.isScanning = false;
      await pinRecord.save();
    }

    return NextResponse.json({ success: true, id: result._id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pin = searchParams.get('pin');

    if (!pin) return NextResponse.json({ error: 'PIN required' }, { status: 400 });

    await dbConnect();
    const result = await Result.findOne({ pin });

    if (!result) return NextResponse.json({ error: 'Result not found or expired' }, { status: 404 });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 });
  }
}

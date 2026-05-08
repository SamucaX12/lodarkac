import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomString from '@/models/CustomString';
import { cookies } from 'next/headers';

export async function GET() {
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

    // Enterprise vê apenas as dele + globais (opcional)
    // Para simplificar agora, vê as dele
    const strings = await CustomString.find({ ownerId: adminKeyString }).sort({ createdAt: -1 });
    
    return NextResponse.json(strings);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar strings' }, { status: 500 });
  }
}

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

    const { process, clientName, stringValue, severity } = await req.json();

    if (!process || !clientName || !stringValue) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    const newString = await CustomString.create({
      ownerId: adminKeyString,
      process,
      clientName,
      stringValue,
      severity
    });

    return NextResponse.json(newString);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar string' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    try {
      await dbConnect();
      const authCookie = cookies().get('admin_auth')?.value || '';
      const parts = authCookie.split('|');
      const adminKeyString = parts[3] || '';
  
      const { id } = await req.json();
  
      const deleted = await CustomString.findOneAndDelete({ _id: id, ownerId: adminKeyString });
      if (!deleted) return NextResponse.json({ error: 'String não encontrada' }, { status: 404 });
  
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: 'Erro ao deletar string' }, { status: 500 });
    }
  }

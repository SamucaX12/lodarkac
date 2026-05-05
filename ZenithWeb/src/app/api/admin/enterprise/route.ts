import { cookies } from 'next/headers';

export async function GET() {
  try {
    const auth = cookies().get('admin_auth')?.value || '';
    const parts = auth.split('|');
    const isSuperAdmin = auth.startsWith('superadmin');
    const plan = parts[1];

    if (!isSuperAdmin && plan === 'Mensal') {
      return NextResponse.json({ error: 'Acesso restrito ao plano Enterprise.' }, { status: 403 });
    }

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
    const auth = cookies().get('admin_auth')?.value || '';
    const parts = auth.split('|');
    const isSuperAdmin = auth.startsWith('superadmin');
    const plan = parts[1];

    if (!isSuperAdmin && plan === 'Mensal') {
      return NextResponse.json({ error: 'Acesso restrito ao plano Enterprise.' }, { status: 403 });
    }

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

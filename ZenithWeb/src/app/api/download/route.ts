import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pin = searchParams.get('pin');

  if (!pin) {
    return NextResponse.json({ error: 'PIN is required' }, { status: 400 });
  }

  // Na Vercel real, este arquivo deveria ser servido de um Bucket S3 ou CDN.
  // Como estamos servindo do diretório public, vamos redirecionar pro arquivo falso
  // (O cliente vai baixar um arquivo dummy para testes se o real não estiver na pasta public)
  
  const exeUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/LodarkAC.exe`;
  
  // Vamos forçar o navegador a baixar com o nome LodarkAC_[PIN].exe
  // A melhor forma no Next.js Serverless é fazer um fetch no arquivo original 
  // e retornar os bytes com o cabeçalho Content-Disposition alterado.
  
  try {
    // Para simplificar no ambiente de teste/Vercel, vamos apenas fazer um redirect
    // O atributo 'download' na tag <a> do frontend cuida de renomear o arquivo.
    return NextResponse.redirect(exeUrl);
  } catch (err) {
    return NextResponse.json({ error: 'Executable not found' }, { status: 404 });
  }
}

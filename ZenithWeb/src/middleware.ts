import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Pega o cookie de admin
  const adminCookie = request.cookies.get('admin_auth')?.value;
  const isAdmin = adminCookie === 'true' || 
                  (adminCookie && adminCookie.startsWith('superadmin')) || 
                  (adminCookie && adminCookie.startsWith('admin')) || 
                  (adminCookie && adminCookie.startsWith('screenshare')) || 
                  (adminCookie && adminCookie.startsWith('user')) || 
                  (adminCookie && adminCookie.startsWith('reseller'));

  const protectedRoutes = ['/dashboard', '/pins', '/enterprise', '/logs', '/stats', '/search', '/resellers', '/result'];
  const isProtected = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // Libera totalmente as rotas de API públicas que o C++ acessa
  const publicApiRoutes = ['/api/auth', '/api/config', '/api/result', '/api/download'];
  const isPublicApi = publicApiRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (isPublicApi) {
    return NextResponse.next();
  }

  if (!isAdmin && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se tentar acessar o login já estando logado, manda pro dashboard
  if (isAdmin && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/pins/:path*', '/enterprise/:path*', '/logs/:path*', '/stats/:path*', '/search/:path*', '/result/:path*', '/login', '/api/((?!auth|config|result|download).*)'],
};

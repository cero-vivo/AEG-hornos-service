import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Proteger solo la ruta /admin y sus subrutas
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = request.headers.get('authorization');
    
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      
      // Credenciales de administrador (cambiar en producción)
      const adminUser = process.env.ADMIN_USER || 'admin';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      
      if (user === adminUser && pwd === adminPassword) {
        return NextResponse.next();
      }
    }
    
    // Si no está autenticado, solicitar credenciales
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Panel"',
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Esta función maneja la validación de la cookie
export function middleware(request: NextRequest) {
  // Rutas protegidas
  const protectedRoutes = ['/profile', '/products']

  // Obtener la ruta actual
  const currentPath = request.nextUrl.pathname

  // Verificar si la ruta actual es una de las protegidas
  if (protectedRoutes.includes(currentPath)) {
    // Leer la cookie "authToken"
    const authToken = request.cookies.get('authToken')

    // Si no existe la cookie, redirigir a la página de login
    if (!authToken) {
      const loginUrl = new URL('/', request.url)  // Redirige a la página de login ("/")
      return NextResponse.redirect(loginUrl)
    }
  }

  // Si no hay problemas con la cookie, o la ruta no es protegida, continuar normalmente
  return NextResponse.next()
}

// Configuración del middleware para que se aplique solo a las rutas especificadas
export const config = {
  matcher: ['/profile', '/products'], // Aplica el middleware solo a estas rutas
}

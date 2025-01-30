// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Définissez vos identifiants (à mettre dans les variables d'environnement plus tard)
const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || "admin";
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD || "leforage2024";

export function middleware(request: NextRequest) {
  // Ne pas protéger les assets et les images
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/assets") ||
    request.nextUrl.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Récupérer l'en-tête d'autorisation
  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    // Vérifier les identifiants
    const auth = authHeader.split(" ")[1];
    const [user, pwd] = atob(auth).split(":");

    if (user === BASIC_AUTH_USER && pwd === BASIC_AUTH_PASSWORD) {
      return NextResponse.next();
    }
  }

  // Si non autorisé, renvoyer la demande d'authentification
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

// Configurer les routes à protéger
export const config = {
  matcher: [
    // Protéger toutes les routes sauf celles définies ci-dessus
    "/((?!_next/static|_next/image|assets|favicon.ico).*)",
  ],
};

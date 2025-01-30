import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Test basique pour voir si le middleware est appelé
  console.log("Middleware called for path:", request.nextUrl.pathname);

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const auth = authHeader.split(" ")[1];
    const [user, pwd] = atob(auth).split(":");

    if (user === "test" && pwd === "test") {
      return NextResponse.next();
    }
  }

  return new NextResponse("Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/:path*"],
};

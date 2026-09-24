import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Appelé par le webhook Prismic à chaque publication / dépublication
export async function POST(request: Request) {
  const secret = process.env.PRISMIC_WEBHOOK_SECRET;

  if (secret) {
    const body = await request.json().catch(() => null);
    if (body?.secret !== secret) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }
  }

  revalidateTag("prismic");
  // Les pages sont aussi en ISR : on force leur régénération
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

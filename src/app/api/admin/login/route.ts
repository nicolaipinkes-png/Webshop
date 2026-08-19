import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (typeof password !== "string" || !verifyPassword(password)) {
    return NextResponse.json({ error: "Falsches Passwort." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

function sessionToken() {
  return createHmac("sha256", process.env.ADMIN_PASSWORD!)
    .update("nova-admin-session")
    .digest("hex");
}

export function verifyPassword(password: string) {
  const expected = Buffer.from(process.env.ADMIN_PASSWORD!);
  const actual = Buffer.from(password);
  return (
    expected.length === actual.length && timingSafeEqual(expected, actual)
  );
}

export async function createAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return false;
  const expected = Buffer.from(sessionToken());
  const actual = Buffer.from(value);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

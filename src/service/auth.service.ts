import * as jose from "jose";
import { cookies } from "next/headers";

export async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jose.jwtVerify(token, secret);

  return payload;
}

export async function createSessionToken(payload: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  const { exp } = await openSessionToken(token);

  cookies().set("@coffee-delivery:token", token, {
    expires: (exp as number) * 1000,
    path: "/",
    httpOnly: true,
  });
}

export async function getSessionToken() {
  const sessionCookie = cookies().get("@coffee-delivery:token");

  if (sessionCookie) {
    const { value } = sessionCookie;
    const token = await openSessionToken(value);

    return token as any;
  }

  return null;
}

export async function isSessionValid() {
  const sessionCookie = cookies().get("@coffee-delivery:token");

  if (sessionCookie) {
    const { value } = sessionCookie;
    const { exp } = await openSessionToken(value);
    const currentDate = new Date().getTime();

    return (exp as number) * 1000 > currentDate;
  }

  return false;
}

export async function destroySessionToken() {
  cookies().delete("@coffee-delivery:token");
}

/**
 * Edge-compatible JWT helpers — used by both server actions and proxy.ts.
 * No Node-only imports here (don't import "next/headers", "fs", etc).
 */
import { SignJWT, jwtVerify } from "jose";
import { JWT_ALGORITHM, SESSION_TTL_SECONDS } from "./config";

export interface SessionPayload {
  userId: string;
  role: "CUSTOMER" | "ADMIN";
}

function getSecret(): Uint8Array {
  const raw = process.env.AUTH_SECRET;
  if (!raw) throw new Error("AUTH_SECRET environment variable is not set");
  return new TextEncoder().encode(raw);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: [JWT_ALGORITHM],
    });
    if (typeof payload.userId !== "string") return null;
    if (payload.role !== "CUSTOMER" && payload.role !== "ADMIN") return null;
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
}

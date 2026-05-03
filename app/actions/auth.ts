"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, destroySession } from "@/lib/auth/session";
import { LoginSchema, RegisterSchema } from "@/lib/auth/schemas";

/* ── State shape returned to <form action> components ── */
export type AuthState =
  | {
      ok: false;
      message?: string;
      errors?: Record<string, string[]>;
    }
  | undefined;

function flatErrors(
  err: { issues: { path: PropertyKey[]; message: string }[] },
): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "_";
    (out[key] ||= []).push(issue.message);
  }
  return out;
}

// ──────────────────────────────────────────────
// REGISTER (customer)
// ──────────────────────────────────────────────
export async function registerAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { ok: false, errors: flatErrors(parsed.error) };
  }

  const { name, email, phone, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, message: "An account with this email already exists." };
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      phone,
      password: await hashPassword(password),
      role: "CUSTOMER",
    },
  });

  await createSession({ userId: user.id, role: user.role });
  redirect("/");
}

// ──────────────────────────────────────────────
// LOGIN (customer or admin)
// ──────────────────────────────────────────────
export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { ok: false, errors: flatErrors(parsed.error) };
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.password))) {
    return { ok: false, message: "Invalid email or password." };
  }

  await createSession({ userId: user.id, role: user.role });
  redirect(user.role === "ADMIN" ? "/admin" : "/");
}

// ──────────────────────────────────────────────
// ADMIN LOGIN — same as login but rejects non-admins
// ──────────────────────────────────────────────
export async function adminLoginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { ok: false, errors: flatErrors(parsed.error) };
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (
    !user ||
    user.role !== "ADMIN" ||
    !(await verifyPassword(password, user.password))
  ) {
    /* Generic message — don't leak whether email exists / is admin */
    return { ok: false, message: "Invalid admin credentials." };
  }

  await createSession({ userId: user.id, role: user.role });
  redirect("/admin");
}

// ──────────────────────────────────────────────
// LOGOUT
// ──────────────────────────────────────────────
export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}

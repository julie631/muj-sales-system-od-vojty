import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, expectedToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get("password") || "");
  const next = String(form.get("next") || "/");

  if (!process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json(
      { error: "Chybí DASHBOARD_PASSWORD — nastav ho v .env.local nebo ve Vercelu." },
      { status: 500 }
    );
  }

  if (password !== process.env.DASHBOARD_PASSWORD) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("error", "1");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url, { status: 303 });
  }

  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  const res = NextResponse.redirect(new URL(safeNext, req.nextUrl.origin), { status: 303 });
  res.cookies.set({
    name: AUTH_COOKIE,
    value: await expectedToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: req.nextUrl.protocol === "https:",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const dest = new URL("/login", req.nextUrl.origin);
  const res = NextResponse.redirect(dest, { status: 303 });
  res.cookies.set({
    name: AUTH_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: req.nextUrl.protocol === "https:",
    path: "/",
    maxAge: 0,
  });
  return res;
}

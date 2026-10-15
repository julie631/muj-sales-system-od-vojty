/**
 * Přihlášení jedním heslem (DASHBOARD_PASSWORD).
 * V cookie neleží heslo, ale jeho otisk — funguje v middleware (Edge) i v API (Node).
 */
export const AUTH_COOKIE = "sc_auth";

export async function expectedToken(): Promise<string> {
  const pwd = process.env.DASHBOARD_PASSWORD || "";
  if (!pwd) return "";
  const data = new TextEncoder().encode(`sales-coach::${pwd}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

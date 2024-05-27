import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
  return NextResponse.json({});
}

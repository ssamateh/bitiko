import { OnboardingProps } from "@/interface";
import { onboard } from "@/lib/account";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
  return NextResponse.json({});
}

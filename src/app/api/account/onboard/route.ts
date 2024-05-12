import { OnboardingUser } from "@/interface";
import { onboard } from "@/lib/account";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const account: OnboardingUser = await req.json();
  return onboard(account)
    .then((res) => NextResponse.json({}))
    .catch((err) => NextResponse.json(err.message, { status: 409 }));
}

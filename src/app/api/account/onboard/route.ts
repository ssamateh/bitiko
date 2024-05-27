import { OnboardingProps } from "@/interface";
import { onboard } from "@/lib/account";
import { capitalize } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const arg: OnboardingProps = await req.json();
  arg.firstName = capitalize(arg.firstName);
  arg.lastName = capitalize(arg.lastName);
  arg.email = arg.email.toLowerCase();
  return onboard(arg)
    .then((res) => NextResponse.json({}))
    .catch((err) => NextResponse.json(err.message, { status: 409 }));
}

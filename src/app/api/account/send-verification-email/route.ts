import { sendVerificationEmail } from "@/lib/account";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email }: { email: string } = await req.json();
  return sendVerificationEmail(email.toLowerCase())
    .then((token) => {
      return NextResponse.json({ token });
    })
    .catch((err) => NextResponse.json(err.message, { status: 403 }));
}

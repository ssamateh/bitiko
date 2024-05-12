import { LoginUser } from "@/interface";
import { login } from "@/lib/account";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  const user: LoginUser = await req.json();
  return login(user)
    .then(({ token, user }) => {
      const cookieStore = cookies();
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      cookieStore.set("token", token, { expires });
      cookieStore.set("user", JSON.stringify(user), { expires });
      return NextResponse.json({});
    })
    .catch((err) => NextResponse.json(err.message, { status: 401 }));
}

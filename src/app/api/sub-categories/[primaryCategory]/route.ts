import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { primaryCategory } }: { params: { primaryCategory: string } }
) {
  console.log({ primaryCategory });
  return NextResponse.json([]);
}

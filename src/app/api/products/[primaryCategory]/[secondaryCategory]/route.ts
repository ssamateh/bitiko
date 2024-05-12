import { getProducts } from "@/lib/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  {
    params: { primaryCategory, secondaryCategory },
  }: { params: { primaryCategory: string; secondaryCategory: string } }
) {
  const products = await getProducts({ primaryCategory, secondaryCategory });
  return NextResponse.json(products);
}

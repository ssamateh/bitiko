import { getProduct } from "@/lib/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params: { productId } }: { params: { productId: string } }
) {
  const product = await getProduct(Number(productId));
  return NextResponse.json(product);
}

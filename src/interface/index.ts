import { Category, Product, Color, Size, User } from "@prisma/client";

interface CategoryEntry extends Omit<Category, "isPrimaryCategory"> {}

export enum Colors {
  primaryBg = "rgba(0,128,128, .7)",
  primaryColor = "rgb(0,128,128)",
}

export interface MenuEntry extends CategoryEntry {
  subCategories: CategoryEntry[];
}

interface ProductColor extends Omit<Color, "productId"> {}

interface ProductSize extends Omit<Size, "productId"> {}

interface ProductBrand extends Omit<Size, "productId"> {}

export interface ProductCardData
  extends Omit<
    Product,
    "createdAt" | "deletedAt" | "primaryCategoryId" | "brandId"
  > {
  brand: ProductBrand;
  colors?: ProductColor[];
  sizes?: ProductSize[];
  secondaryCategories?: CategoryEntry[];
  primaryCategory?: CategoryEntry;
}

export type VoidMethod = () => void;

export interface OnboardingUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface SanitizedUser {
  firstName: string;
  lastName: string;
  middleName: string | null;
}

export interface OtpLogin {
  otp: string;
  shortLivedToken: string;
}

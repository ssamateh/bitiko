import { Category } from "@prisma/client";

interface MenuItem extends Omit<Category, "isPrimaryCategory"> {}

export enum Color {
  primaryBg = "rgba(0,128,128, .7)",
}

export interface MenuEntry extends MenuItem {
  subCategories: MenuItem[];
}

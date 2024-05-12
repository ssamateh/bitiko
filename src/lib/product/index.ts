import { MenuEntry, ProductCardData } from "@/interface";
import { PrimaryCategory } from "@/constants";
import prisma from "@/db";

export const getMenuEntries = () =>
  prisma.secondaryCategory
    .findMany({
      include: {
        Category: true,
        Product: {
          include: {
            Category: true,
          },
        },
      },
    })
    .then((value) => {
      const menuEntries = new Map<number, MenuEntry>();
      value.forEach((entry) => {
        const primaryCategory = entry.Product.Category;
        const secondaryCategory = entry.Category;

        // Add Primary Category to entry if it doesn't already exist
        if (
          primaryCategory.isPrimaryCategory &&
          !menuEntries.has(primaryCategory.id)
        ) {
          menuEntries.set(primaryCategory.id, {
            ...primaryCategory,
            subCategories: [],
          });
        }

        // Link secondary category to the current primary if it hasn't already been done
        const categoryAlreadyHasSubCategory = !!menuEntries
          .get(primaryCategory.id)
          ?.subCategories.find(({ id }) => id === secondaryCategory.id);

        if (!categoryAlreadyHasSubCategory) {
          menuEntries
            .get(primaryCategory.id)
            ?.subCategories.push(secondaryCategory);
        }
      });
      const originalEntries = Array.from(menuEntries.values());
      const others =
        originalEntries.find(({ name }) => name === PrimaryCategory.OTHER) ||
        ({ subCategories: [] } as unknown as MenuEntry);

      const result: MenuEntry[] = [];
      originalEntries
        .filter(({ name }) => name !== PrimaryCategory.OTHER)
        .forEach((entry) => {
          if (entry.subCategories.length < 3) {
            others.subCategories.push(entry);
          } else {
            result.push(entry);
          }
        });

      return others.subCategories.length ? [...result, others] : result;
    });

const omit = ({ exclude, obj }: { exclude: String[]; obj: any }): any => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  const result: any = {};
  const excludeSet = new Set(exclude);
  Object.keys(obj).forEach((key) => {
    if (!excludeSet.has(key)) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const getProducts = ({
  primaryCategory,
  secondaryCategory,
}: {
  primaryCategory: string;
  secondaryCategory: string;
}) =>
  prisma.secondaryCategory
    .findMany({
      include: {
        Product: {
          include: {
            Category: true,
            Brand: true,
          },
        },
        Category: true,
      },
      where: {
        Category: {
          name: {
            equals: secondaryCategory,
            mode: "insensitive",
          },
        },
        Product: {
          Category: {
            name: {
              equals: primaryCategory,
              mode: "insensitive",
            },
          },
        },
      },
    })
    .then((secondaryTableEntries) => {
      const products = new Map<number, ProductCardData>();
      secondaryTableEntries.forEach((entry) => {
        if (!products.has(entry.productId)) {
          products.set(entry.productId, {
            ...omit({
              exclude: [
                "createdAt",
                "deletedAt",
                "primaryCategoryId",
                "brandId",
              ],
              obj: entry.Product,
            }),
            brand: omit({ exclude: ["productId"], obj: entry.Product.Brand }),
            primaryCategory: omit({
              exclude: ["isPrimaryCategory"],
              obj: entry.Product.Category,
            }),
            // secondaryCategories: [],
            // Get colors
            // Get sizes
          });
        }
        // products
        //   .get(entry.productId)
        //   ?.secondaryCategories?.push(
        //     omit({ exclude: ["isPrimaryCategory"], obj: entry.Category })
        //   );
      });
      return Array.from(products.values());
    });

export const getProduct = (id: number) =>
  prisma.product.findFirst({
    include: {
      Brand: true,
      Category: true,
      SecondaryCategory: true,
      Color: true,
      Size: true,
    },
    where: { id },
  });

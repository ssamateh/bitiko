import { MenuEntry } from "@/interface";
import { PrimaryCategory } from "@/constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

      return [...result, others];
    });

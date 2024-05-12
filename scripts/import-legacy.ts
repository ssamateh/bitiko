import { Brands, PrimaryCategory, Unknown } from "@/constants";
import prisma from "@/db";
import { SecondaryCategory } from "@prisma/client";
import { products, brands, categories, images } from "./inventory.json";

const getPrimaryCategory = (category: string) => {
  switch (category?.toLocaleLowerCase()) {
    case "automotive supplies":
    case "auto air fresheners":
    case "auto care & maintenance":
    case "cv joints":
    case "shaft":
    case "tire pressure gauge":
      return PrimaryCategory.AUTOMOTIVES;
    case "aluminum foil":
    case "barware":
    case "bakeware":
    case "bleach":
    case "brooms & mops":
    case "bobby pins":
    case "cake server":
    case "cleaning":
    case "cleaning cloths":
    case "clothspins":
    case "condiment dispensers":
    case "cookware":
    case "cups, mugs & bottles":
    case "dust pan":
    case "flashlights":
    case "floor cleaner":
    case "household supplies":
    case "air fresheners":
    case "kitchen tools & utensils":
    case "kitchen & dining":
    case "laundry detergent":
    case "laundry supplies":
    case "lighter":
    case "loofahs & shower scrubs":
    case "needles & needle sets":
    case "peanut butter":
    case "platic cups":
    case "plastic plates":
    case "safety pins":
    case "sewing kits":
    case "shower curtain liner":
    case "shoe lace":
    case "sponges & scouring pads":
    case "spray bottles":
    case "straws":
    case "toilet brush":
    case "toilet cleaner":
    case "toilet papers":
    case "trash containers":
    case "whisk":
      return PrimaryCategory.HOUSEHOLD_AND_KITCHEN_ESSENTIALS;
    case "adult washcloths":
    case "bandages":
    case "bar soap":
    case "bath sponge":
    case "bath tissue":
    case "body wash & lotion":
    case "condom":
    case "cosmetic tools & brushes":
    case "cosmetic mirrors":
    case "cotton swabs":
    case "cotton balls":
    case "cosmetics":
    case "cough drops":
    case "dental care":
    case "deodorant":
    case "disposable razors":
    case "eye makeup":
    case "facial tissue":
    case "facial cleaning pads":
    case "face makeup":
    case "face mask":
    case "hand soap":
    case "hair bands & scrunchies":
    case "hair brushes":
    case "hair care":
    case "hair styling":
    case "health care":
    case "hot & cold packs":
    case "lip makeup":
    case "makeup":
    case "makeup remover":
    case "mouthwash":
    case "nail sets":
    case "nail tools":
    case "nail polish":
    case "nail polish remover":
    case "pain reliever":
    case "pads":
    case "peroxide":
    case "personal care":
    case "petroleum jelly":
    case "pills":
    case "shampoo":
    case "shampoo & conditioner":
    case "toothpaste":
    case "vapor cream":
      return PrimaryCategory.PERSONAL_HEALTH_AND_BEAUTY;
    case "babay":
    case "baby":
    case "bay":
    case "baby wipes":
    case "binaculars":
    case "diaper":
    case "formula":
    case "nappies":
    case "toy vehicles":
    case "toy weapons":
    case "wipes":
      return PrimaryCategory.TOYS_KIDS_AND_BABIES;
    case "baking soda":
    case "biscuit":
    case "bread crumbs":
    case "breakfast & cereal":
    case "canola oil":
    case "canned fruits":
    case "chocolate spread":
    case "condiments":
    case "condense milk":
    case "corn flakes":
    case "corn starch":
    case "cooking essentials":
    case "cooking oil":
    case "cookies":
    case "crisps":
    case "diced tomatoes":
    case "drink":
    case "drinks, coffee, tea & cocoa":
    case "energy drinks":
    case "evaporated milk":
    case "food":
    case "foods":
    case "flour":
    case "ginger beer":
    case "grain":
    case "gum":
    case "hashbrown":
    case "ice cream":
    case "juice":
    case "ketchup":
    case "macaroni and cheese":
    case "mayonaise":
    case "milk":
    case "mustard":
    case "noodles":
    case "pasta":
    case "pasta sauce":
    case "pear":
    case "peanut":
    case "pineapple":
    case "potato chips":
    case "pringles":
    case "protein bar":
    case "ramen":
    case "rice":
    case "salad dressing":
    case "saltin":
    case "sauce":
    case "seasoning":
    case "shortbread":
    case "snack":
    case "snacks":
    case "soda":
    case "soup":
    case "sports drink":
    case "spaghetti":
    case "sparkling juice":
    case "sugar":
    case "sweets":
    case "sweet corn":
    case "tomato sauce":
    case "tomato paste":
    case "vegetable oil":
    case "vinegar":
    case "water":
      return PrimaryCategory.GROCERY_FOOD_AND_DRINKS;
    case "earbuds":
    case "headphones":
      return PrimaryCategory.ELECTRONICS_AND_APPLIANCES;
    default:
      console.log("cannot map", category, "assigning to other");
      return PrimaryCategory.OTHER;
  }
};

const getCleanedLabel = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/`$/, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join(" ")
    .trim();

const getEntryMaps = (entries: { id: number; name: string }[]) => {
  const idToName = new Map<number, string>();
  const nameToObj = new Map<string, { name: string; images: string[] }>();

  entries.forEach((entry) => {
    const name = getCleanedLabel(entry.name) || Unknown;
    idToName.set(entry.id, name);
    if (!nameToObj.has(name)) {
      nameToObj.set(name, { name, images: [""] });
    }
  });

  return { idToName, nameToObj };
};

const primaryCategories = [
  { name: PrimaryCategory.AUTOMOTIVES, images: [""] },
  { name: PrimaryCategory.TOYS_KIDS_AND_BABIES, images: [] },
  { name: PrimaryCategory.SEASONAL_ITEMS, images: [] },
  {
    name: PrimaryCategory.GROCERY_FOOD_AND_DRINKS,
    images: ["https://akiesu-images.s3.amazonaws.com/categories/grocery.webp"],
  },
  {
    name: PrimaryCategory.PERSONAL_HEALTH_AND_BEAUTY,
    images: ["https://akiesu-images.s3.amazonaws.com/categories/ceraVe.webp"],
  },
  { name: PrimaryCategory.ELECTRONICS_AND_APPLIANCES, images: [] },
  {
    name: PrimaryCategory.HOUSEHOLD_AND_KITCHEN_ESSENTIALS,
    images: ["https://akiesu-images.s3.amazonaws.com/categories/comet.webp"],
  },
  { name: PrimaryCategory.CLOTH_SHOES_JEWELRY_AND_WATCHES, images: [] },
  { name: PrimaryCategory.PET_SUPPLIES, images: [] },
  { name: PrimaryCategory.OTHER, images: [] },
];

export default (async () => {
  const { idToName: brandLookup, nameToObj: brandEntries } =
    getEntryMaps(brands);
  brandEntries.set(Unknown, { name: Unknown, images: [""] });

  const { idToName: categoryLookup, nameToObj: categoryEntries } =
    getEntryMaps(categories);

  const finalImageMap = new Map<number, string[]>();

  images.forEach(({ product_id: id, image_path: path }) => {
    finalImageMap.set(id, [...(finalImageMap.get(id) ?? []), path]);
  });
  const finalCategoryIdMap = new Map<string, number>();
  const finalBrandIdMap = new Map<string, number>();

  console.log("creating categories...");
  return prisma.category
    .createMany({
      skipDuplicates: true,
      data: [
        ...primaryCategories.map((entry) => ({
          ...entry,
          isPrimaryCategory: true,
        })),
        ...Array.from(categoryEntries.values()).filter(
          ({ name }) => !(name in PrimaryCategory)
        ),
      ],
    })
    .then(() => {
      console.log("querying categories...");
      return prisma.category.findMany();
    })
    .then((entries) => {
      entries.forEach((entry) => {
        finalCategoryIdMap.set(entry.name, entry.id);
      });
      console.log(finalCategoryIdMap.size, "diff categories");

      console.log("creating brands....");
      return prisma.brand.createMany({
        skipDuplicates: true,
        data: Array.from(brandEntries.values()),
      });
    })
    .then(() => {
      console.log("fetching brands...");
      return prisma.brand.findMany({});
    })
    .then((entries) => {
      entries.forEach((entry) => {
        finalBrandIdMap.set(entry.name, entry.id);
      });
      console.log(finalBrandIdMap.size, "diff brands");
      // Now we have category & brand ids, so let's create the Products
      console.log("creating products...");
      const unknownBrand = finalBrandIdMap.get(Brands.Unknown);
      const finalProducts = products.map((p) => {
        const brandId = p.brand_id
          ? finalBrandIdMap.get(brandLookup.get(p.brand_id)!)
          : unknownBrand;
        const primaryCategoryId = finalCategoryIdMap.get(
          getPrimaryCategory(categoryLookup.get(p.category_id!)!)
        );
        if (!(brandId && primaryCategoryId)) {
          console.log("Woops", { p, brandId, primaryCategoryId });
          throw p;
        }
        return {
          brandId: brandId!,
          details: p.description ?? p.title,
          images: finalImageMap.get(p.id),
          name: getCleanedLabel(p.title),
          price: p.sales_price,
          primaryCategoryId: primaryCategoryId!,
        };
      });

      return prisma.product.createMany({
        skipDuplicates: true,
        data: finalProducts,
      });
    })
    .then(() => prisma.product.findMany({}))
    .then((entries) => {
      console.log(`attempted creating ${products.length} products`);
      console.log(`created ${entries.length} products`);
      const secondaryCategoryEntries: SecondaryCategory[] = [];
      entries.forEach(({ id: productId }, index) => {
        secondaryCategoryEntries.push({
          productId,
          categoryId:
            finalCategoryIdMap.get(
              categoryLookup.get(products[index].sub_category_id!)!
            ) ?? finalCategoryIdMap.get(PrimaryCategory.OTHER)!,
        });
      });
      return prisma.secondaryCategory.createMany({
        skipDuplicates: true,
        data: secondaryCategoryEntries,
      });
    })
    .then(() => console.log("Done...."))
    .catch(console.error);
})();

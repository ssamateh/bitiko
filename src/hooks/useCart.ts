import { ProductCardData } from "@/interface";

type AddItem = (item: ProductCardData) => void;
interface UseCart {
  addItem: AddItem;
}

export const useCart = (): UseCart => {
  const addItem: AddItem = (item) => {
    console.log("item", item);
  };

  return {
    addItem,
  };
};

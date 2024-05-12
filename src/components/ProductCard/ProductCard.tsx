import Image from "next/image";

import { ProductCardData } from "@/interface";
import styles from "./ProductCard.module.scss";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { ProductTitle } from "../ProductTitle/ProductTitle";
import { Price } from "../Price/Price";

interface ProductCardProps extends ProductCardData {
  cardSize: number;
}

const ProductCard: React.FC<ProductCardProps> = (product) => {
  const { id, images, cardSize, name, price } = product;
  const router = useRouter();
  const goToProductPage = () => {
    router.push(`/p/${encodeURIComponent(name)}/${id}`);
  };

  const cart = useCart();

  const addItem = () => {
    cart.addItem(product);
  };

  const imageSize = cardSize - 48;
  return (
    <div className={styles.container}>
      <ProductTitle onClick={goToProductPage} title={name} />
      <Image
        className={styles.image}
        src={images?.[0]}
        alt={name}
        width={imageSize}
        height={imageSize}
        onClick={goToProductPage}
      />
      {!!price && <Price price={price} />}
      <div className={styles.ctaContainer}>
        <Button variant="contained" onClick={addItem}>
          add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

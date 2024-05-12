import { VoidMethod } from "@/interface";
import styles from "./ProductTitle.module.scss";

export const ProductTitle: React.FC<{ onClick?: VoidMethod; title: string }> = ({
  onClick,
  title,
}) => {
  return (
    <p className={styles.title} onClick={onClick}>
      {title}
    </p>
  );
};

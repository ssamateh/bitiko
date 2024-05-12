import { useTheme } from "@mui/material";
import styles from "./Price.module.scss";

const formatAmount = (amount: number) => `GMD: ${amount.toFixed(2)}`;

export const Price: React.FC<{ price: number }> = ({ price }) => {
  const theme = useTheme();

  return (
    <div className={styles.price} style={{ color: theme.palette.primary.dark }}>
      {formatAmount(price)}
    </div>
  );
};

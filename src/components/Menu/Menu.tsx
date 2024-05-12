"use client";

import {
  Card,
  IconButton,
  Popover,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Colors, MenuEntry, SanitizedUser } from "@/interface";
import { MenuOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import styles from "./Menu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

const getCookie = (name: string): SanitizedUser | undefined => {
  const user = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`))
    ?.split("=")?.[1];

  return user ? JSON.parse(decodeURIComponent(user)) : user;
};

export default function Menu({ categories }: { categories: MenuEntry[] }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleClickMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (user) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => {
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const [user, setUser] = useState<SanitizedUser>();

  const pathname = usePathname();

  useEffect(() => {
    handleClose();
    setTimeout(() => {
      setUser(getCookie("user"));
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isOpen = !!anchorEl;
  const id = isOpen ? "menu" : undefined;

  const renderMenuIcon = () => (
    <IconButton
      aria-describedby={id}
      onClick={handleClickMenu}
      sx={{
        backgroundColor: "transparent",
        borderRadius: 0,
        border: "none",
      }}
    >
      <MenuOutlined fontSize="large" sx={{ color: "#fff" }} />
    </IconButton>
  );

  const renderLogo = () => (
    <Typography sx={{ color: "#fff" }} variant="h4">
      akiesu
    </Typography>
  );

  const renderCart = () => (
    <IconButton
      sx={{
        backgroundColor: "transparent",
        border: "none",
      }}
    >
      <ShoppingBagOutlined fontSize="medium" sx={{ color: "#fff" }} />
    </IconButton>
  );

  const renderSearchBar = () => (
    <TextField
      size="small"
      sx={{
        flex: 1,
        borderRadius: 1,
        backgroundColor: "#fff",
      }}
    />
  );

  const renderAccountAccess = () =>
    !!user && <Typography color="#fff">Hello, {user.firstName}</Typography>;

  const renderDesktopMenu = () => (
    <>
      {/* <span>Superior Quality For Better Price</span> */}
      <Card
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          borderRadius: 0,
          paddingY: "5px",
        }}
        className={styles["Menu-primary-row"]}
      >
        {renderMenuIcon()}
        {renderLogo()}
        {renderSearchBar()}
        {renderAccountAccess()}
        {renderCart()}
      </Card>
      {!!categories.length && (
        <Popover
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Card raised className={styles.Menu} sx={{ boxShadow: 1 }}>
            {categories.map((cat) => (
              <div key={cat.id} className={styles["Menu-items"]}>
                <Image
                  alt={cat.name}
                  src={cat.images?.[0]}
                  width={75}
                  height={75}
                />
                <Link
                  href={`/product-category/${cat.name}`}
                  className={styles["Menu-items-item-primary"]}
                  onClickCapture={handleClose}
                >
                  {cat.name}
                </Link>
                {cat.subCategories.map((subCat) => (
                  <Link
                    href={`/product-category/${cat.name}/${subCat.name}`}
                    key={subCat.id}
                    className={styles["Menu-items-item-secondary"]}
                    onClickCapture={handleClose}
                  >
                    {subCat.name}
                  </Link>
                ))}
              </div>
            ))}
          </Card>
        </Popover>
      )}
    </>
  );

  const renderMobileMenu = () => (
    <>
      <Card
        sx={{
          boxShadow: "none",
          backgroundColor: "inherit",
        }}
      >
        <Card
          sx={{
            boxShadow: "none",
            backgroundColor: "inherit",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {renderMenuIcon()}
          {renderLogo()}
          {renderCart()}
        </Card>
        <Card
          sx={{
            display: "flex",
            p: 1,
            borderRadius: "0",
            boxShadow: "none",
          }}
        >
          {renderSearchBar()}
        </Card>
      </Card>
    </>
  );

  return (
    <Card
      className={styles["Menu-container"]}
      sx={{ backgroundColor: Colors.primaryBg, borderRadius: 0 }}
    >
      {isMobile ? renderMobileMenu() : renderDesktopMenu()}
    </Card>
  );
}
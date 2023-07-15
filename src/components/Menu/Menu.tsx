"use client";

import {
  AppBar,
  Card,
  IconButton,
  Popover,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Color, MenuEntry } from "@/interface";
import { MenuOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import React, { useState } from "react";

import Image from "next/image";
import styles from "./Menu.module.scss";

export default function Menu({ categories }: { categories: MenuEntry[] }) {
  //
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleClickMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCategory = (category: MenuEntry) => {
    console.log("category", category);
    handleClose();
  };

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
        {renderCart()}
      </Card>
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
              <span
                className={styles["Menu-items-item-primary"]}
                onClick={() => {
                  handleClickCategory(cat);
                }}
              >
                {cat.name}
              </span>
              {cat.subCategories.map((subCat) => (
                <span
                  key={subCat.id}
                  className={styles["Menu-items-item-secondary"]}
                  onClick={() => {
                    handleClickCategory({
                      ...cat,
                      subCategories: [subCat],
                    });
                  }}
                >
                  {subCat.name}
                </span>
              ))}
            </div>
          ))}
        </Card>
      </Popover>
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
      sx={{ backgroundColor: Color.primaryBg, borderRadius: 0 }}
    >
      {isMobile ? renderMobileMenu() : renderDesktopMenu()}
    </Card>
  );
}

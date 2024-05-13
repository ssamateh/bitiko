"use client";

import {
  Button,
  Card,
  IconButton,
  Popover,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Colors, MenuEntry, SanitizedUser } from "@/interface";
import {
  ArrowDropDown,
  MenuOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import styles from "./Menu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Theme from "@/app/Providers/Theme";

const getCookie = (name: string): SanitizedUser | undefined => {
  const user = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`))
    ?.split("=")?.[1];

  return user ? JSON.parse(decodeURIComponent(user)) : user;
};

export default function Menu({ categories }: { categories: MenuEntry[] }) {
  const [desktopMenuAnchorEl, setDesktopMenuAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [userAccountAnchorEl, setUserAccountAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleClickMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (user) {
      setDesktopMenuAnchorEl(e.currentTarget);
    }
  };

  const handleCloseDesktopMenu = () => {
    if (desktopMenuAnchorEl) {
      setDesktopMenuAnchorEl(null);
    }
  };

  const handleCloseUserPopover = () => {
    setUserAccountAnchorEl(null);
  };

  const handleClickOnUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUserAccountAnchorEl(e.currentTarget);
  };

  const [user, setUser] = useState<SanitizedUser>();

  const pathname = usePathname();

  useEffect(() => {
    handleCloseDesktopMenu();
    setTimeout(() => {
      setUser(getCookie("user"));
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isOpen = !!desktopMenuAnchorEl;
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

  const handleLogOut = async () => {
    await fetch("/api/account/sign-out").then(() => {
      setUser(undefined);
    });
  };

  const renderAccountAccess = () =>
    !!user && (
      <>
        <IconButton onClick={handleClickOnUser}>
          <Typography color="#fff">Hello, {user.firstName}</Typography>
          <ArrowDropDown fontSize="medium" sx={{ color: "#fff" }} />
        </IconButton>
        <Popover
          anchorEl={userAccountAnchorEl}
          open={!!userAccountAnchorEl}
          onClose={handleCloseUserPopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Card raised className={styles.User} sx={{ boxShadow: 1 }}>
            <Button variant="outlined" onClick={handleLogOut}>
              Sign Out
            </Button>
          </Card>
        </Popover>
      </>
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
        {renderAccountAccess()}
        {renderCart()}
      </Card>
      {!!categories.length && (
        <Popover
          anchorEl={desktopMenuAnchorEl}
          open={isOpen}
          onClose={handleCloseDesktopMenu}
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
                  onClickCapture={handleCloseDesktopMenu}
                >
                  {cat.name}
                </Link>
                {cat.subCategories.map((subCat) => (
                  <Link
                    href={`/product-category/${cat.name}/${subCat.name}`}
                    key={subCat.id}
                    className={styles["Menu-items-item-secondary"]}
                    onClickCapture={handleCloseDesktopMenu}
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
    <Theme>
      <Card
        className={styles["Menu-container"]}
        sx={{ backgroundColor: Colors.primaryBg, borderRadius: 0 }}
      >
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </Card>
    </Theme>
  );
}

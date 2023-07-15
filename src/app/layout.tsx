import "./globals.css";

import { Category } from "@prisma/client";
import Menu from "@/components/Menu/Menu";
import { getMenuEntries } from "@/lib/product";
import styles from "./page.module.scss";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getMenuEntries();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className={styles.AppContainer}>
          <div>
            <Menu categories={categories} />
          </div>
          <div className={styles.AppContent}>{children}</div>
        </div>
      </body>
    </html>
  );
}

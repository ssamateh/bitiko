import "./globals.css";

import styles from "./page.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className={styles.AppContainer}>
          <div className={styles.AppMenu}>Menu</div>
          <div className={styles.AppContent}>{children}</div>
        </div>
      </body>
    </html>
  );
}

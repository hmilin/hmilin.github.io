import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../Header";
import styles from "./index.module.css";

interface LayoutProps {
  title?: string;
  description?: string;
  time?: string;
}

const Layout: NextPage<LayoutProps> = ({
  children,
  title,
  description,
  time,
}) => {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <div className={styles.banner}>
          <h1>{title}</h1>
          <p>{description}</p>
          {time && <div>{time}</div>}
        </div>
        {children}
      </main>
      <footer className="grid place-items-center pb-4">
        <a href="https://hmilin.github.io" rel="noopener">
          😘Github
        </a>
      </footer>
    </div>
  );
};

export default Layout;

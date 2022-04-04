import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../Header";
import styles from "./index.module.css";

interface LayoutProps {
  title?: string;
  description?: string;
}

const Layout: NextPage<LayoutProps> = ({ children, title, description }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <div className={styles.banner}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;

import type { NextPage } from "next";
import Header from "../Header";
import styles from "./index.module.css";
import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";

interface LayoutProps {
  cover?: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const Layout: NextPage<PropsWithChildren<LayoutProps>> = ({
  cover,
  children,
  className,
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <Header />
      <div>
        <main>
          {cover && <div className={styles.cover}>{cover}</div>}
          {children}
        </main>
        <footer className="grid place-items-center pb-4">
          <a
            href="https://github.com/hmilin"
            target="_blank"
            rel="noreferrer noopener"
          >
            😘Github
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Layout;

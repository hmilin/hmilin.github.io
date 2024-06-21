import { NextPage } from "next";
import Link from "next/link";
import { useScroll } from "ahooks";
import classNames from "classnames";

import styles from "./index.module.css";

const Header: NextPage<{}> = () => {
  const scroll = useScroll();

  return (
    <header
      className={classNames(styles.header, {
        [styles.scrolled]: scroll?.top && scroll?.top > 600,
      })}
    >
      <Link href="/">Meiling's Blog</Link>
      <nav>
        <ul>
          <li>
            <Link href="/#posts">文章</Link>
          </li>
          <li>
            <Link href="/about">关于</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

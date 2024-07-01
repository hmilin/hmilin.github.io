import { NextPage } from "next";
import Link from "next/link";
import classNames from "classnames";

import HouseSvg from "../Icons/house.svg";
import BoxSvg from "../Icons/box.svg";
import LibrarySvg from "../Icons/library_books.svg";
import ToolSvg from "../Icons/build_circle.svg";
import UserSvg from "../Icons/face.svg";
import SearchSvg from "../Icons/search.svg";
import MenuSvg from "../Icons/menu.svg";
import CloseSvg from "../Icons/close.svg";

import styles from "./index.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const menus = [
  {
    link: "/",
    title: "首页",
    icon: <HouseSvg />,
  },
  {
    link: "/category/native",
    title: "原生基础",
    icon: <BoxSvg />,
  },
  {
    link: "/category/framework",
    title: "框架相关",
    icon: <LibrarySvg />,
  },
  {
    link: "/category/tool",
    title: "工具使用",
    icon: <ToolSvg />,
  },
  {
    link: "/about",
    title: "关于",
    icon: <UserSvg />,
  },
];

const Header: NextPage<{}> = () => {
  const pathname = usePathname();

  const [open, setopen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.mobileNav}>
        <div className={styles.menuIcon} onClick={() => setopen(true)}>
          <MenuSvg />
        </div>
        <Link className={styles.searchBtn} href="/search">
          <SearchSvg />
        </Link>
      </div>
      <nav className={classNames(styles.nav, open ? styles.open : "")}>
        <div className={styles.closeIcon} onClick={() => setopen(false)}>
          <CloseSvg />
        </div>
        <Link className={styles.searchBtn} href="/search">
          <SearchSvg />
        </Link>
        {menus.map(({ link, title, icon }) => (
          <Link
            key={title}
            href={link}
            className={link === pathname ? styles.active : ""}
            scroll
            onClick={() => setopen(false)}
          >
            <div className={styles.icon}>{icon}</div>
            <div className={styles.title}>{title}</div>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;

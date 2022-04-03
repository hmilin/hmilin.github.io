import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <main>{children}</main>

      <footer></footer>
    </div>
  );
};

export default Layout;

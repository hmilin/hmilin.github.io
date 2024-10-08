import type { NextPage } from "next";
import Layout from "../components/Layout";
import type { AboutData } from "./api/about";
import classNames from "classnames";

import styles from "../styles/about.module.css";
import Image from "next/image";

export async function getStaticProps() {
  return {
    props: {
      data: {
        cover: "bk.jpg",
        avatar: "/avatar.png",
        name: "美玲",
        introduce: "前端开发，19届，广东工业大学信息工程专业",
        icons: [
          {
            name: "github",
            url: "https://github.com/hmilin",
            cover: "/github.svg",
          },
        ],
      },
    },
  };
}

const About: NextPage<{ data: AboutData }> = ({ data }) => {
  return (
    <Layout
      cover={
        <div>
          <h1>个人介绍</h1>
        </div>
      }
    >
      <div className={classNames("content-container", styles.aboutContainer)}>
        <div className={styles.avatar}>
          <Image src={data.avatar} width={100} height={100} alt="avatar" />
        </div>
        <h2>{data.name}</h2>
        <p>{data.introduce}</p>
        <div className={styles.contacts}>
          {data.icons.map((icon) => (
            <a
              key={icon.name}
              href={icon.url}
              rel="noopener noreferrer"
              target="_blank"
              className="inline-block"
            >
              <Image src={icon.cover} width={20} height={20} alt={icon.name} />
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default About;

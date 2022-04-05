import type { NextPage } from "next";
import Layout from "../components/Layout";
import { AboutData } from "./api/about";
import classNames from "classnames";

import styles from "../styles/about.module.css";

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/about");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const About: NextPage<{ data: AboutData }> = ({ data }) => {
  return (
    <Layout>
      <div className={classNames("content-container", styles.aboutContainer)}>
        <div className={styles.avatar}>
          <img src={data.avatar} alt="avatar" />
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
              <img src={icon.cover} alt={icon.name} />
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default About;

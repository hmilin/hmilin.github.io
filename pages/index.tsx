import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { postFilePaths, POSTS_PATH } from "../utils/mdxUtils";

type MatterDate = {
  title: string;
  description?: string;
  date: string;
  public?: boolean;
};

interface HomeProps {
  posts: {
    title: string;
    description: string;
    date: string;
    cover?: string;
    path: string;
  }[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <Layout>
      <div id="posts" className={styles.postContainer}>
        {posts.map((post) => (
          <Link key={post.title} href={`posts/${post.path}`}>
            <a className={styles.card}>
              <div>
                <img src={post.cover || "/empty.jpg"} alt="cover" />
              </div>
              <div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
              <div className={styles.time}>{post.date}</div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const posts = postFilePaths
    // Remove file extensions for page paths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));

      const { data } = matter(source) as unknown as { data: MatterDate };
      return { ...data, path: filePath.replace(/\.mdx?$/, "") };
    })
    .filter((data) => data.public !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
};

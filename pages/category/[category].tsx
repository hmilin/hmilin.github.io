import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NextPage } from "next";
import Link from "next/link";
import Layout from "components/Layout";
import styles from "styles/Home.module.css";
import { postFilePaths, POSTS_PATH } from "utils/mdxUtils";
import PostCard from "components/PostCard";

const categoryNames = {
  native: "原生基础",
  framework: "框架相关",
  tool: "工具使用",
  performance: "性能提升",
} as const;

type Params = {
  category: keyof typeof categoryNames;
};

type MatterDate = {
  title: string;
  description?: string;
  date: string;
  public?: boolean;
  category?: string;
};

interface CategoryProps {
  posts: {
    title: string;
    description: string;
    date: string;
    cover?: string;
    path: string;
  }[];
  category: Params["category"];
}

const CategoryPage: NextPage<CategoryProps> = ({ posts, category }) => {
  return (
    <Layout
      cover={
        <div>
          <h1>{categoryNames[category]}</h1>
        </div>
      }
    >
      <div id="posts" className={styles.postContainer}>
        {posts.map((post) => (
          <Link key={post.title} href={`/posts/${post.path}`}>
            <PostCard {...post} />
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default CategoryPage;

export const getStaticProps = async ({
  params: { category },
}: {
  params: Params;
}) => {
  const posts = postFilePaths
    // Remove file extensions for page paths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));

      const { data } = matter(source) as unknown as { data: MatterDate };
      return { ...data, path: filePath.replace(/\.mdx?$/, "") };
    })
    .filter((data) => data.public !== false)
    .filter((data) => category === data.category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
      category,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: Object.keys(categoryNames).map((category) => ({
      params: { category },
    })),
    fallback: false,
  };
};

import fs from "fs";
import matter from "gray-matter";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import Comment from "../../components/Comment";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";
import CodeBlock from "../../components/CodeBlock";
import remarkGfm from "remark-gfm";
import remarkMdxMindElixir from "utils/mind-plugin";
import MindElixir from "components/MindElixir";
import LinearPopover from "components/demo/LinearPopover";
import SimpleLinearPopover from "components/demo/LinearPopover/SimpleLinearPopover";
import createAnchorTitle from "components/AnchorTitle/CreateAnchorTitle";
import extractCatalogues from "utils/extractCatalogues";
import type { Headings } from "components/Catalogue";
import Catalogues from "components/Catalogue";

interface PostsPageProps {
  source: any;
  frontMatter: {
    title: string;
    description: string;
    date: string;
  };
  headings: Headings;
}

const titleComponents = Array.from({ length: 5 }).reduce<
  Record<string, React.FC>
>((a, _, i) => {
  a[`h${i + 1}`] = createAnchorTitle(i + 1);
  return a;
}, {});

const components = {
  Head,
  pre: CodeBlock,
  MindElixir,
  LinearPopover,
  SimpleLinearPopover,
  LinearPopover,
  ...titleComponents,
};

const PostsPage: NextPage<PostsPageProps> = ({
  source,
  frontMatter,
  headings,
}) => {
  return (
    <Layout
      cover={
        <div>
          <h1>{frontMatter.title}</h1>
          <p>{frontMatter.description}</p>
          <div>{frontMatter.date}</div>
        </div>
      }
    >
      <div className="content-container">
        <MDXRemote {...source} components={components} />
        <Catalogues headings={headings} />
      </div>
      <div className="content-container">
        <Comment />
      </div>
    </Layout>
  );
};

export default PostsPage;

type Params = {
  slug: string;
};

type Data = {
  title: string;
  description: string;
  date: string;
};

export const getStaticProps = async ({ params }: { params: Params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const headings: Headings[] = [];
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkMdxMindElixir,
        [extractCatalogues, headings],
      ],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      headings,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

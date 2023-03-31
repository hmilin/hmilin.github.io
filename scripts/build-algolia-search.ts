import { POSTS_PATH, postFilePaths } from "../utils/mdxUtils";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import algoliasearch from "algoliasearch";
import { ALGOLIA_APP_ID, ALGOLIA_INDEX_NAME } from "../utils/algolia-config";

async function getAllBlogPosts() {
  const articles = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content, // this is the .mdx content
      data, // this is the frontmatter
      filePath, // this is the file path
    };
  });

  return articles;
}

function transformPostsToSearchObjects(
  articles: Awaited<ReturnType<typeof getAllBlogPosts>>
) {
  const transformed = articles.map((article) => {
    return {
      objectID: article.data.title,
      title: article.data.title,
      description: article.data.description,
      slug: article.filePath,
      date: article.data.date,
      content: article.content,
      type: "article",
    };
  });

  return transformed;
}

(async function () {
  try {
    const articles = await getAllBlogPosts();
    const transformed = transformPostsToSearchObjects(articles);

    // initialize the client with your environment variables
    const client = algoliasearch(
      ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY || ""
    );

    // initialize the index with your index name
    const index = client.initIndex(ALGOLIA_INDEX_NAME);

    // add the data to the index
    const algoliaResponse = await index.saveObjects(transformed);

    console.log(
      `Successfully added ${
        algoliaResponse.objectIDs.length
      } records to Algolia search! Object IDs:\n${algoliaResponse.objectIDs.join(
        "\n",
      )}`
    );
  } catch (err) {
    console.error(err);
  }
})();

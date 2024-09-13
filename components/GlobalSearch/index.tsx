import algoliasearch from "algoliasearch/lite";
import type { HitsProps } from "react-instantsearch-hooks-web";
import {
  InstantSearch,
  SearchBox,
  useHits,
} from "react-instantsearch-hooks-web";
import {
  ALGOLIA_APP_ID,
  ALGOLIA_INDEX_NAME,
  ALGOLIA_SEARCH_API_KEY,
} from "utils/algolia-config";
import classNames from "classnames";

import styles from "./index.module.css";
import { useMemo } from "react";
import Link from "next/link";

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);

const CustomHits: React.FC<HitsProps<any>> = () => {
  const { hits, results } = useHits<any>();
  const query = results?.query;

  const menus = useMemo(
    () =>
      hits.map(({ slug, title }) => ({
        slug,
        title,
        url: `/posts/${slug.replace(".mdx", "")}`,
      })),
    [hits]
  );

  return (
    <div className={styles["search-menus"]}>
      {query &&
        menus.map((menu) => (
          <Link
            className={styles["menu-item"]}
            key={menu.title}
            href={menu.url}
          >
            {menu.title}
          </Link>
        ))}
    </div>
  );
};

interface GlobalSearchProps {
  className?: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ className }) => {
  return (
    <div className={classNames(className, styles["search-box"])}>
      <InstantSearch indexName={ALGOLIA_INDEX_NAME} searchClient={searchClient}>
        <SearchBox />
        <CustomHits />
      </InstantSearch>
    </div>
  );
};

export default GlobalSearch;

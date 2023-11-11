import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  useHits,
  HitsProps,
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
  const { hits } = useHits<any>();

  const menus = useMemo(
    () =>
      hits.map(({ slug, title }) => ({
        slug,
        title,
        url: `/posts/${slug.replace(".mdx", "")}`,
      })),
    [hits]
  );

  console.log('menus',menus)

  return (
    <div className={styles["search-dropdown"]}>
      {menus.map((menu) => (
        <div className={styles["menu-item"]} key={menu.title}>
          <Link href={menu.url}>{menu.title}</Link>
        </div>
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

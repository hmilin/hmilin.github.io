import GlobalSearch from "components/GlobalSearch";
import { NextPage } from "next";
import styles from "../styles/search.module.css";
import Layout from "components/Layout";

const SearchPage: NextPage = () => {
  return (
    <Layout className={styles.searchPage}>
      <GlobalSearch />
    </Layout>
  );
};

export default SearchPage;

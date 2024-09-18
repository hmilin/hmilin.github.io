import Skeletons from "./Skeletons";
import useActiveHeading from "./useActiveHeading";
import styles from "./styles.module.css";
import Navigation from "./Navigation";

export type Headings = { depth: number; text: string }[];
interface CataloguesProps {
  headings: Headings;
}

const Catalogues: React.FC<CataloguesProps> = ({ headings }) => {
  const active = useActiveHeading(headings);
  return (
    <div className={styles["catalogue-container"]}>
      <Skeletons headings={headings} active={active} />
      <Navigation headings={headings} active={active} />
    </div>
  );
};

export default Catalogues;

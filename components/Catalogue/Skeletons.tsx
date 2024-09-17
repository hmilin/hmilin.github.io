import styles from "./styles.module.css";

type Headings = { depth: number; text: string }[];
interface SkeletonsProps {
  headings: Headings;
}

const Skeletons: React.FC<SkeletonsProps> = ({ headings }) => {
  return (
    <div className={styles["skeleton-container"]}>
      {headings.map(({ depth, text }) => (
        <div key={text} className={styles["skeleton"]} data-level={depth} />
      ))}
    </div>
  );
};

export default Skeletons;

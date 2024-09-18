import classNames from "classnames";
import styles from "./styles.module.css";
import type { Headings } from ".";

interface SkeletonsProps {
  headings: Headings;
  active?: string;
}

const Skeletons: React.FC<SkeletonsProps> = ({ headings, active }) => {
  return (
    <div className={styles["skeleton-container"]}>
      {headings.map(({ depth, text }) => (
        <div
          key={text}
          className={classNames(styles["skeleton"], {
            [styles["active"]]: text === active,
          })}
          data-level={depth}
        />
      ))}
    </div>
  );
};

export default Skeletons;

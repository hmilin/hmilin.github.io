import classNames from "classnames";
import type { Headings } from ".";
import styles from "./styles.module.css";

interface NavigationProps {
  headings: Headings;
  active?: string;
}

const Navigation: React.FC<NavigationProps> = ({ headings, active }) => {
  return (
    <nav className={styles["navigation"]}>
      <ul>
        {headings.map(({ text, depth }) => (
          <li
            key={text}
            className={classNames({ [styles["active"]]: text === active })}
            data-level={depth}
          >
            <a href={`#${text}`}>{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

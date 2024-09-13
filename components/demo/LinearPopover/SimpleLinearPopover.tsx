import classNames from "classnames";
import type { PropsWithChildren } from "react";

import styles from "./styles.module.css";

type ArrowDirection = "left" | "right";

interface SimpleLinearPopoverProps {
  arrowDirection?: ArrowDirection;
  parrentBackground?: string;
}

const SimpleLinearPopover: React.FC<PropsWithChildren<SimpleLinearPopoverProps>> = ({
  arrowDirection = "left",
  parrentBackground = "#fff",
  children,
}) => {
  return (
    <div
      className={classNames(
        styles["simple-popover-container"],
        styles[`simple-popover-container-direction-${arrowDirection}`]
      )}
      style={{
        "--parent-background-color": parrentBackground,
      }}
    >
      <div className={styles["simple-popover-content"]}>{children}</div>
      <div className={styles["simple-popover-arrow"]}></div>
    </div>
  );
};

export default SimpleLinearPopover;

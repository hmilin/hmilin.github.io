import classNames from "classnames";
import type { PropsWithChildren } from "react";

import styles from "./styles.module.css";

type ArrowDirection = "left" | "right";

interface LinearPopoverProps {
  arrowDirection?: ArrowDirection;
}

const LinearPopover: React.FC<PropsWithChildren<LinearPopoverProps>> = ({
  arrowDirection = "left",
  children,
}) => {
  return (
    <div
      className={classNames(
        styles["popover-container"],
        styles[`popover-container-direction-${arrowDirection}`]
      )}
    >
      {children}
    </div>
  );
};

export default LinearPopover;

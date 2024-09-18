import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { useRef } from "react";

import styles from "./styles.module.css";
import useEnhancedEffect from "utils/useEnhancedEffect";

type ArrowDirection = "left" | "right";

interface LinearPopoverProps {
  arrowDirection?: ArrowDirection;
}

const LinearPopover: React.FC<PropsWithChildren<LinearPopoverProps>> = ({
  arrowDirection = "left",
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEnhancedEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect) {
            const { width, height } = entry.target.getBoundingClientRect();
            const path = genPopoverPath(width, height);
            containerRef.current!.style["clip-path"] = `path('${path}')`;
          }
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={classNames(
        styles["popover-container"],
        styles[`popover-container-direction-${arrowDirection}`]
      )}
    >
      <div className={styles["popover-container-content"]}>{children}</div>
    </div>
  );
};

function genPopoverPath(width: number, height: number) {
  const borderRadius = 12;
  const arrowWidth = 10;
  const path = `M 0 ${borderRadius}
   A ${borderRadius} ${borderRadius} 0 0 1 ${borderRadius} 0 
   L ${width - borderRadius - arrowWidth} 0 
   A ${borderRadius} ${borderRadius} 0 0 1 ${
    width - arrowWidth
  } ${borderRadius} 
   L  ${width - arrowWidth} ${borderRadius} 
   L ${width} 21 
   L ${width - arrowWidth} 30 
   L ${width - arrowWidth} ${height - borderRadius} 
   A ${borderRadius} ${borderRadius} 0 0 1 ${
    width - borderRadius - arrowWidth
  } ${height} 
   L ${borderRadius} ${height}  
   A ${borderRadius} ${borderRadius} 0 0 1 0 ${height - borderRadius}
   L 0 ${borderRadius} Z`;

  return path.replaceAll("\n", "");
}

export default LinearPopover;

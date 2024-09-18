import type { PropsWithChildren } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5";

const createAnchorTitle = (level: 1 | 2 | 3 | 4 | 5) => {
  const AnchorTitle: React.FC<PropsWithChildren> = ({ children, ...props }) => {
    const Component: HeadingTag = `h${level}`;
    return (
      <Component id={children?.toString()} {...props}>
        <a href={`#${children}`} className="mr-2">
          #
        </a>
        {children}
      </Component>
    );
  };
  return AnchorTitle;
};

export default createAnchorTitle;

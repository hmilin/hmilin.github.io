const createAnchorTitle = (level: number) => {
  const AnchorTitle: React.FC = ({ children, ...props }) => {
    const Component = `h${level}`;
    return (
      <Component id={children} {...props}>
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

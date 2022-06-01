import type { NextPage } from "next";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ocean } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const CodeBlock: NextPage<any> = ({ children }) => {
  if (
    !children ||
    !(children.type?.name === "Code" || children.type === "code")
  )
    return children;

  const {
    props: { className, ...props },
  } = children;

  const language = className
    ? className.replace(/language-/, "")
    : "javascript";

  return (
    <SyntaxHighlighter
      codeTagProps={{ className: "block-code" }}
      language={language}
      style={ocean}
      {...props}
    />
  );
};

export default CodeBlock;

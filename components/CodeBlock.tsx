import type { NextPage } from "next";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ocean } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface CodeProps {
  className?: string;
}

const Code: NextPage<CodeProps> = ({ className, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return (
    <SyntaxHighlighter
      language={match?.[1] || "javascript"}
      PreTag="div"
      style={ocean}
      {...props}
    />
  );
};

export default Code;

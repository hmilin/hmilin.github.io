import { NextPage } from "next/types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ocean } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Code: NextPage = ({ className, ...props }) => {
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

import type { NextPage } from "next";

const Code: NextPage<{}> = (props) => {
  return <code {...props} className="inline-code" />;
};

export default Code;

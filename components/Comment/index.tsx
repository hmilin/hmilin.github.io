import Giscus from "@giscus/react";

interface CommentProps {}

const Comment: React.FC<CommentProps> = () => {
  return (
    <Giscus
      id="comments"
      repo="hmilin/hmilin.github.io"
      repoId="R_kgDOHYEW0w"
      category="Announcements"
      categoryId="DIC_kwDOHYEW084CRtrV"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="zh-CN"
      loading="lazy"
    />
  );
};

export default Comment;

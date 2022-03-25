// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type AboutData = {
  cover: string;
  avatar: string;
  name: string;
  introduce: string;
  icons: {
    name: string;
    url: string;
    cover: string;
  }[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AboutData>
) {
  res.status(200).json({
    cover: "bk.jpg",
    avatar: "avatar.png",
    name: "美玲",
    introduce: "前端开发，19届，广东工业大学信息工程专业",
    icons: [
      {
        name: "github",
        url: "https://github.com/hmilin",
        cover: "github.svg",
      },
    ],
  });
}

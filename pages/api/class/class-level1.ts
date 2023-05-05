import type { NextApiRequest, NextApiResponse } from "next";
import { classLevel1 } from "@/data/class";
import { CommonGameDataType } from "@/types/game";

type Data = CommonGameDataType[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(classLevel1.sort(() => Math.random() - 0.5));
}

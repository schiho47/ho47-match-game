import type { NextApiRequest, NextApiResponse } from "next";
import { classLevel2 } from "@/data/class";
import { ClassLineType } from "@/types/game";

type Data = ClassLineType[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(classLevel2.sort(() => Math.random() - 0.5));
}

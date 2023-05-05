import type { NextApiRequest, NextApiResponse } from 'next'
import { topic } from '@/data/topic'
type Data = {
  title: string;
  type:string;
}[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(topic);
};
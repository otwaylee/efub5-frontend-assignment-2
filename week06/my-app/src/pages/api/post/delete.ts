import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'DELETE') {
    try {
      const db = (await connectDB).db('forum');
      const result = await db
        .collection('post')
        .deleteOne({ _id: new ObjectId(req.body) });
      res.status(200).json('삭제완료');
    } catch (error) {
      res.status(500);
    }
  }
}

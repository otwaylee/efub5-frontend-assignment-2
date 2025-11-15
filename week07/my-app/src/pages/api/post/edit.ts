import { connectDB } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    const newDocument = {
      title: req.body.title,
      content: req.body.content,
    };

    const db = (await connectDB).db('forum');
    const result = await db
      .collection('post')
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: newDocument });

    return res.redirect(302, '/list');
  }
}

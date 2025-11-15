import type { NextApiHandler } from 'next';
import type { WithId } from 'mongodb';
import type Post from '@/models/post';
import { postCollection } from '@/utils/database';

const handler: NextApiHandler<WithId<Post>[]> = async (req, res) => {
  const result = await postCollection.find().toArray();
  return res.status(200).json(result);
};

export default handler;

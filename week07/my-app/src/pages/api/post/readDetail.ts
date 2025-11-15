import type { NextApiHandler } from 'next';
import { WithId, ObjectId } from 'mongodb';
import type Post from '@/models/post';
import { postCollection } from '@/utils/database';

const handler: NextApiHandler<WithId<Post> | { error: string }> = async (
  req,
  res
) => {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }

  try {
    const result = await postCollection.findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export default handler;

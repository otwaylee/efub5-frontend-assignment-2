import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session)
    return res.status(401).json({ message: '로그인이 필요합니다.' });

  const db = (await connectDB).db('forum');

  const post = await db
    .collection('post')
    .findOne({ _id: new ObjectId(req.body.postId) });

  if (!post) return res.status(404).json({ message: '게시글 없음' });

  if (post.author !== session?.user?.email) {
    return res.status(403).json({ message: '본인 글만 삭제할 수 있습니다.' });
  }

  await db.collection('post').deleteOne({ _id: new ObjectId(req.body.postId) });

  res.status(200).json({ message: '삭제 완료' });
}

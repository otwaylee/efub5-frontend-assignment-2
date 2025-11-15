import { connectDB } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session)
    return res.status(401).json({ message: '로그인이 필요합니다.' });

  const postId = req.body._id;
  if (!postId) {
    return res.status(400).json({ message: '게시글 ID가 필요합니다.' });
  }

  const db = (await connectDB).db('forum');
  const post = await db
    .collection('post')
    .findOne({ _id: new ObjectId(postId) });

  if (!post) return res.status(404).json({ message: '게시글 없음' });

  const isAuthor = post.author === session.user?.email;
  const isAdmin = session.user?.role === 'admin';

  if (!isAuthor && !isAdmin) {
    return res
      .status(403)
      .json({ message: '본인 또는 관리자만 수정할 수 있습니다.' });
  }

  const newDocument = {
    title: req.body.title,
    content: req.body.content
  };

  await db
    .collection('post')
    .updateOne({ _id: new ObjectId(postId) }, { $set: newDocument });

  return res.redirect(302, '/list');
}

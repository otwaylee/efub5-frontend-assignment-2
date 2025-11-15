import { connectDB } from '@/utils/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import Post from '@/models/post';
import { ObjectId } from 'mongodb';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session)
    return res.status(401).json({ message: '로그인이 필요합니다.' });

  const userEmail = session.user?.email;
  if (typeof userEmail !== 'string') {
    return res.status(400).json({ message: '유효한 이메일이 없습니다.' });
  }
  const { postId } = JSON.parse(req.body);
  const db = (await connectDB).db('forum');

  const post = await db
    .collection('post')
    .findOne({ _id: new ObjectId(postId) });
  if (!post) return res.status(404).json({ message: '게시글 없음' });

  const alreadyLiked = post.likes.includes(userEmail);

  let updatedPost;

  if (alreadyLiked) {
    updatedPost = await db
      .collection<Post>('post')
      .findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { $pull: { likes: userEmail } },
        { returnDocument: 'after' }
      );
  } else {
    updatedPost = await db
      .collection<Post>('post')
      .findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { $addToSet: { likes: userEmail } },
        { returnDocument: 'after' }
      );
  }

  return res.json({
    liked: !alreadyLiked,
    likes: updatedPost?.value?.likes.length
  });
}

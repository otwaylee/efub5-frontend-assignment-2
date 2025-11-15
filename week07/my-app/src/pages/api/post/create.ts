import type { NextApiHandler } from 'next';
import { postCollection } from '@/utils/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import Post from '@/models/post';

const handler: NextApiHandler = async (req, res) => {
  let session = await getServerSession(req, res, authOptions);

  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ error: '로그인이 필요합니다.' });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: '빈 형식이 있습니다.' });
    }

    try {
      const newPost = {
        title,
        content,
        author: session.user?.email!,
        likes: []
      };

      await postCollection.insertOne(newPost);

      return res.redirect(302, '/list');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'DB 에러' });
    }
  }
};

export default handler;

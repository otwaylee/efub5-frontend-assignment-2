import type { NextApiHandler } from 'next';
import { postCollection } from '@/utils/database';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    if (!req.body.title || !req.body.content) {
      return res.status(500).json({ error: '빈 형식이 있습니다.' });
    }
    try {
      const result = await postCollection.insertOne(req.body);
      return res.redirect(302, '/list');
    } catch (error) {
      console.error(error);
    }
  }
};

export default handler;

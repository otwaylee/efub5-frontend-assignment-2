import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/database';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: 'normal'
    };

    let db = (await connectDB).db('forum');
    await db.collection('user').insertOne(newUser);
    alert('회원가입에 성공했습니다!');
    return res.redirect(302, '/');
  }
}

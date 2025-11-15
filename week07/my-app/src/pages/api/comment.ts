import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';

import { commentCollection } from '@/utils/database';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: '로그인이 필요합니다.' });

    const { postId, content } = req.body ?? {};
    if (!postId || !content || !content.trim()) {
      return res.status(400).json({ message: '댓글 내용을 입력해 주세요.' });
    }

    let postObjectId: ObjectId;
    try {
      postObjectId = new ObjectId(postId);
    } catch {
      return res.status(400).json({ message: '잘못된 게시글 ID입니다.' });
    }

    const newComment = {
      postId: postObjectId,
      authorEmail: session.user?.email ?? '',
      authorName: session.user?.name ?? '익명',
      content: content.trim(),
      createdAt: new Date()
    };

    const result = await commentCollection.insertOne(newComment);

    return res.status(201).json({
      ...newComment,
      _id: result.insertedId,
      postId: postId,
      createdAt: newComment.createdAt.toISOString()
    });
  }

  if (req.method === 'GET') {
    const { postId } = req.query;

    if (!postId || typeof postId !== 'string') {
      return res.status(400).json({ message: 'postId가 필요합니다.' });
    }

    let postObjectId: ObjectId;
    try {
      postObjectId = new ObjectId(postId);
    } catch {
      return res.status(400).json({ message: '잘못된 게시글 ID입니다.' });
    }

    const comments = await commentCollection
      .find({ postId: postObjectId })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json(
      comments.map((comment) => ({
        ...comment,
        _id: comment._id?.toString(),
        postId,
        createdAt: comment.createdAt?.toISOString()
      }))
    );
  }

  return res.status(405).end();
}

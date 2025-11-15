import { ObjectId } from 'mongodb';

import { commentCollection } from '@/utils/database';

export async function getCommentsByPostId(postId: string) {
  let objectId: ObjectId;
  try {
    objectId = new ObjectId(postId);
  } catch {
    throw new Error('잘못된 게시글 ID입니다.');
  }

  return commentCollection
    .find({ postId: objectId })
    .sort({ createdAt: -1 })
    .toArray();
}

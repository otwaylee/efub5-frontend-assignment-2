// services/postService.ts
import { postCollection } from '@/utils/database';
import { ObjectId } from 'mongodb';
import type Post from '@/models/post';

// id로 게시글을 조회하는 함수
export async function getPostById(id: string) {
  // ObjectId 변환, 에러 처리
  let _id: ObjectId;

  try {
    _id = new ObjectId(id);
  } catch {
    throw new Error('잘못된 게시글 ID입니다.');
  }

  const post = await postCollection.findOne({ _id });
  if (!post) throw new Error('게시글을 찾을 수 없습니다.');

  return post;
}

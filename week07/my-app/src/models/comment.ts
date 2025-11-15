import type { ObjectId } from 'mongodb';

export default interface Comment {
  _id?: ObjectId;
  postId: ObjectId;
  authorEmail: string;
  authorName: string;
  content: string;
  createdAt: Date;
}

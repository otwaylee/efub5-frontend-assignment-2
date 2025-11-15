import { getPostById } from '@/app/services/postService';
import { getCommentsByPostId } from '@/app/services/commentService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import LikeBtn from '@/app/LikeBtn';
import CommentSection from './CommentSection';

interface Props {
  params: { id: string };
}

export default async function Detail({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);
  const session = await getServerSession(authOptions);
  const comments = await getCommentsByPostId(id);
  const serializedComments = comments.map((comment) => ({
    _id:
      comment._id?.toString() ??
      `temp-${Math.random().toString(36).slice(2, 11)}`,
    authorName: comment.authorName ?? '익명',
    authorEmail: comment.authorEmail ?? '',
    content: comment.content,
    createdAt: comment.createdAt
      ? comment.createdAt.toISOString()
      : new Date().toISOString()
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 rounded-md bg-gray-200 p-4">
        <h1>
          <span className="font-semibold">제목:</span> {post.title}
        </h1>
        <p>
          <span className="font-semibold">내용: </span>
          <span>{post.content}</span>
        </p>
      </div>

      <LikeBtn
        postId={id}
        currentUserEmail={session?.user?.email ?? null}
        likes={post.likes}
      />
      <CommentSection postId={id} initialComments={serializedComments} />
    </div>
  );
}

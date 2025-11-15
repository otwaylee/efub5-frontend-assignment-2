import { getPostById } from '@/app/services/postService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import LikeBtn from '@/app/LikeBtn';

interface Props {
  params: { id: string };
}

export default async function Detail({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);
  const session = await getServerSession(authOptions);

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
    </div>
  );
}

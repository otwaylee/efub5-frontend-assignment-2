import { getPostById } from '@/app/services/postService';
import type Post from '@/models/post';

interface Props {
  params: Promise<{ id: string }>;
}

const Detail = async ({ params }: Props) => {
  const { id } = await params;
  let post: Post | null = null;
  try {
    post = await getPostById(id);
  } catch (e: any) {
    return <div>에러: {e.message}</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default Detail;

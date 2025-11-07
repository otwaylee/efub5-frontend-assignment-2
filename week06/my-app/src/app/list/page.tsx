import type Post from '@/models/post';
import type { WithId } from 'mongodb';
import axios from 'axios';
import Link from 'next/link';

const List = async () => {
  const readPostList = async (): Promise<WithId<Post>[]> => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/post/readList'
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  };

  const posts: WithId<Post>[] = await readPostList();
  // posts를 활용해서 JSX 반환

  return (
    <ul>
      {posts.map((item, index) => (
        <li key={index}>
          <Link href={`/detail/${item._id}`}>
            <h4>{item.title}</h4>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default List;

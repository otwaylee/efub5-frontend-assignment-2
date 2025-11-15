import type { WithId } from 'mongodb';
import Link from 'next/link';

import type Post from '@/models/post';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import DeleteBtn from '../DeleteBtn';

export default async function ListItem({ result }: { result: WithId<Post>[] }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full space-y-3">
      {result.map((post) => (
        <div className="list-item" key={post._id.toString()}>
          <div className="flex items-center justify-between">
            <Link href={`/detail/${post._id}`}>
              <h4 className="text-lg font-medium">{post.title}</h4>
            </Link>

            {(session?.user?.email === post.author ||
              session?.user?.role === 'admin') && (
              <div className="flex items-center gap-2">
                <Link
                  href={`/edit/${post._id}`}
                  className="rounded border px-2 py-1 text-sm"
                >
                  ✏️
                </Link>

                <DeleteBtn postId={post._id.toString()} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

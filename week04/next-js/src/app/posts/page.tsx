import Link from 'next/link';

const posts = [
  { id: '1', title: 'Next.js 시작하기' },
  { id: '2', title: '폴더 기반 라우팅 배우기' },
  { id: '3', title: 'App Router 중첩 라우팅' },
];

export default function PostsPage() {
  return (
    <div>
      <h1>포스트 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

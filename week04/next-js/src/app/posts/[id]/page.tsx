'use client';
import { use } from 'react';
import { useState } from 'react';
import styles from './page.module.css'; 

const posts: Record<string, { title: string; content: string }> = {
  '1': {
    title: 'Next.js 시작하기',
    content: 'Next.js는 React 기반 풀스택 프레임워크입니다.',
  },
  '2': {
    title: '폴더 기반 라우팅 배우기',
    content: '폴더 구조에 따라 자동으로 라우트가 생성됩니다.',
  },
  '3': {
    title: 'App Router 중첩 라우팅',
    content: 'Layout을 통해 중첩 라우팅이 가능합니다.',
  },
};

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const post = posts[id];

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <button
        onClick={handleLike}
        className={`${styles.likeButton} ${
          liked ? styles.liked : styles.unliked
        }`}>
        {liked ? '❤️ 좋아요 취소' : '💚 좋아요'} ({likes})
      </button>
    </div>
  );
}

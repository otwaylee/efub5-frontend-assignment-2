'use client';

import { useState, useTransition } from 'react';

interface Props {
  postId: string;
  currentUserEmail: string | null;
  likes: string[];
}

export default function LikeBtn({ postId, currentUserEmail, likes }: Props) {
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(
    currentUserEmail ? likes.includes(currentUserEmail) : false
  );

  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    if (!currentUserEmail) {
      alert('로그인이 필요합니다.');
      return;
    }

    startTransition(async () => {
      const response = await fetch('/api/post/like', {
        method: 'POST',
        body: JSON.stringify({ postId })
      });

      const result = await response.json();

      setIsLiked(result.liked);
      setLikeCount(result.likes);
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`w-fit rounded-md px-4 py-1 ${
        isLiked ? 'bg-red-200' : 'bg-amber-200'
      }`}
    >
      💓좋아요 {likeCount}개
    </button>
  );
}

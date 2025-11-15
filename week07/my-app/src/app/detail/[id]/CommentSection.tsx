'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type CommentItem = {
  _id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
};

interface Props {
  postId: string;
  initialComments: CommentItem[];
}

export default function CommentSection({ postId, initialComments }: Props) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/comment?postId=${postId}`);
        if (!response.ok) {
          throw new Error('댓글을 불러오지 못했습니다.');
        }
        const data: CommentItem[] = await response.json();
        if (!ignore) {
          setComments(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchComments();

    return () => {
      ignore = true;
    };
  }, [postId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!content.trim()) {
      alert('댓글 내용을 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, content })
      });

      if (!response.ok) {
        throw new Error('댓글 작성에 실패했습니다.');
      }

      const newComment: CommentItem = await response.json();
      setComments((prev) => [newComment, ...prev]);
      setContent('');
    } catch (error) {
      console.error(error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-4 rounded-md">
      <div className="border-b-3 border-gray-300">
        <h2 className="text-lg font-semibold">댓글</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={3}
          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-gray-500 focus:outline-none"
          placeholder="댓글을 입력하세요."
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-amber-200 px-4 py-1 font-medium whitespace-nowrap text-black disabled:opacity-50"
        >
          {isSubmitting ? '작성 중...' : '댓글 작성'}
        </button>
      </form>

      {isLoading ? (
        <p className="text-sm text-gray-500">댓글을 불러오는 중...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-500">아직 댓글이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li key={comment._id} className="rounded-md bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{comment.authorName}</span>
                <span>
                  {new Date(comment.createdAt).toLocaleString('ko-KR', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-800">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

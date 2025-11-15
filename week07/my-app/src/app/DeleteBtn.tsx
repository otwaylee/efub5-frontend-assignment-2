'use client';

interface Props {
  postId: string;
}

export default function DeleteBtn({ postId }: Props) {
  const handleDelete = async () => {
    await fetch('/api/post/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId })
    });
    alert('삭제되었습니다.');
    location.reload();
  };

  return (
    <button
      className="cursor-pointer rounded border px-2 py-1 text-sm text-red-600"
      onClick={handleDelete}
    >
      🗑️
    </button>
  );
}

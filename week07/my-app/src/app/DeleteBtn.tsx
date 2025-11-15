'use client';

interface Props {
  postId: string;
}

export default function DeleteBtn({ postId }: Props) {
  const handleDelete = async () => {
    const response = await fetch('/api/post/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId })
    });
    if (!response.ok) {
      const error = await response.json().catch(() => null);
      alert(error?.message ?? '삭제에 실패했습니다.');
      return;
    }
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

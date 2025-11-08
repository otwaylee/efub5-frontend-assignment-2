"use client";

import { useRouter } from "next/navigation";

export default function NavActions() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.back()}
        className="rounded border px-2 py-1 text-sm transition hover:bg-gray-100"
      >
        ← 뒤로
      </button>

      <button
        onClick={() => router.refresh()}
        className="rounded border px-2 py-1 text-sm transition hover:bg-gray-100"
      >
        새로고침
      </button>
    </div>
  );
}

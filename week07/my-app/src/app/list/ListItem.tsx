"use client";

import type { WithId } from "mongodb";
import Link from "next/link";

import type Post from "@/models/post";

export default function ListItem({ result }: { result: WithId<Post>[] }) {
  return (
    <div className="w-full space-y-3">
      {result.map((post) => (
        <div className="list-item" key={post._id.toString()}>
          <div className="flex items-center justify-between">
            <Link href={`/detail/${post._id}`}>
              <h4 className="text-lg font-medium">{post.title}</h4>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href={`/edit/${post._id}`}
                className="rounded border px-2 py-1 text-sm transition hover:bg-gray-100"
              >
                ✏️
              </Link>
              <button
                className="cursor-pointer rounded border px-2 py-1 text-sm text-red-600 transition hover:bg-red-50"
                onClick={async (e) => {
                  await fetch("/api/post/delete", {
                    method: "DELETE",
                    body: post._id.toString()
                  });
                  const parent = (e.target as HTMLElement).closest(
                    ".list-item"
                  );
                  if (parent) {
                    parent.animate([{ opacity: 1 }, { opacity: 0 }], {
                      duration: 500,
                      fill: "forwards"
                    });
                  }
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

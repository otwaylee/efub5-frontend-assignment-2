export const dynamic = "force-dynamic";
import axios from "axios";
import type { WithId } from "mongodb";

import type Post from "@/models/post";

import ListItem from "./ListItem";
import Link from "next/link";

const List = async () => {
  const readPostList = async (): Promise<WithId<Post>[]> => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/post/readList"
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  const posts: WithId<Post>[] = await readPostList();
  // posts를 활용해서 JSX 반환

  return (
    <div className="flex flex-col items-end gap-2">
      <Link
        href={"/write"}
        className="w-fit rounded border bg-amber-200 px-2 py-1"
      >
        글쓰기
      </Link>
      <ListItem result={posts} />
    </div>
  );
};

export default List;

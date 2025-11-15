import { ObjectId } from "mongodb";

import { postCollection } from "@/utils/database";

export default async function Edit({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const result = await postCollection.findOne({ _id: new ObjectId(id) });

  return (
    <div className="p-20">
      <h4>수정 페이지</h4>
      <form action="/api/post/edit" method="POST">
        <div className="flex flex-col gap-4 py-4">
          <input
            className="rounded-sm border border-gray-400 px-2"
            name="title"
            placeholder="제목"
            defaultValue={result?.title}
          />
          <input
            className="rounded-sm border border-gray-400 px-2"
            name="content"
            placeholder="내용"
            defaultValue={result?.content}
          />
          <input
            style={{ display: "none" }}
            name="_id"
            defaultValue={result?._id.toString()}
          />
        </div>
        <button type="submit" className="btn-submit">
          버튼
        </button>
      </form>
    </div>
  );
}

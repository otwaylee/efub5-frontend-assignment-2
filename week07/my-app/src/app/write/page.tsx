const Write = () => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-semibold">작성 페이지</h4>
      <form
        action="api/post/create"
        method="POST"
        className="flex flex-col gap-4"
      >
        <input
          className="rounded-sm border border-gray-400 px-2"
          type="text"
          name="title"
          placeholder="제목"
          required
        />
        <textarea
          className="rounded-sm border border-gray-400 px-2"
          name="content"
          placeholder="내용"
          required
        />
        <button type="submit" className="btn-submit">
          게시
        </button>
      </form>
    </div>
  );
};

export default Write;

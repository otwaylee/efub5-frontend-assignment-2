"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ id, pw })
    });

    if (res.ok) {
      setMessage("회원가입 성공!");
      setId("");
      setPw("");
    } else {
      setMessage("이미 존재하는 아이디입니다.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-5">
      <h2 className="text-lg font-bold">회원가입</h2>

      <input
        className="w-full rounded border p-2"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        className="w-full rounded border p-2"
        placeholder="비밀번호"
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />

      {message && <p className="text-red-500">{message}</p>}
      <button className="rounded bg-black px-4 py-2 text-white">
        가입하기
      </button>
    </form>
  );
}

import Link from "next/link";

import NavActions from "./NavActions";

export default function Header() {
  return (
    <header className="shadow-b-md flex items-center justify-between border-b border-gray-300 bg-amber-50 px-6 py-4">
      <NavActions />
      <h1 className="text-xl font-semibold">
        <Link href="/">게시판</Link>
      </h1>

      <nav className="flex gap-4">
        <Link href="/login" className="hoever:underline text-sm">
          로그인
        </Link>
        <Link href="/signup" className="text-sm hover:underline">
          회원가입
        </Link>
      </nav>
    </header>
  );
}

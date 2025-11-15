'use client';

import Link from 'next/link';

export default function LoginBtn() {
  return (
    <Link href="/login" className="loginbtn">
      로그인
    </Link>
  );
}

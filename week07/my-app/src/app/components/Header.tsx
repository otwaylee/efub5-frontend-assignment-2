'use client';
import Link from 'next/link';

import NavActions from './NavActions';
import LoginBtn from '../LoginBtn';
import { Session } from 'next-auth';
import LogoutBtn from '../LogoutBtn';

type HeaderProps = { session: Session | null };

export default function Header({ session }: HeaderProps) {
  return (
    <header className="navbar bg-amber-100">
      <NavActions />
      <Link href="/" className="logo">
        EFUB5 FORUM
      </Link>
      <nav className="flex items-center gap-4">
        <Link href={'/list'}>List</Link>
        <Link href={'/write'}>Write</Link>

        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-yellow-900">
              {session?.user?.name && `${session.user.name}님`}
            </span>
            <LogoutBtn />
          </div>
        ) : (
          <LoginBtn />
        )}

        {/* //* 임시회원가입 기능 */}
        {/*  <Link href="/signup" className="text-sm hover:underline">
          회원가입
        </Link> */}
      </nav>
    </header>
  );
}

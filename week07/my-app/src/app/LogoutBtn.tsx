'use client';

import { signIn, signOut } from 'next-auth/react';
export default function LogoutBtn() {
  const onLogout = (): void => {
    signOut({ callbackUrl: '/' });
  };
  return (
    <button onClick={onLogout} className="loginbtn">
      로그아웃
    </button>
  );
}

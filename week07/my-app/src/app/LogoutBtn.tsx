'use client';

import { signIn } from 'next-auth/react';
export default function LogoutBtn() {
  const onLogout = (): void => {
    signIn('github');
  };
  return (
    <button onClick={onLogout} className="loginbtn">
      로그아웃
    </button>
  );
}

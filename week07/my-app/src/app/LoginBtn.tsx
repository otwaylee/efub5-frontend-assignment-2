'use client';

import { signIn } from 'next-auth/react';
export default function LoginBtn() {
  const onLogin = (): void => {
    signIn('github');
  };
  return (
    <button onClick={onLogin} className="loginbtn">
      로그인
    </button>
  );
}

'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCredentials = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (response?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      router.push('/list');
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubLogin = () => {
    signIn('github', { callbackUrl: '/' });
  };

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-6 shadow">
      <h1 className="text-xl font-semibold">로그인</h1>

      <form onSubmit={handleCredentials} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일"
          className="w-full rounded border px-3 py-2"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호"
          className="w-full rounded border px-3 py-2"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-amber-200 py-2 font-medium disabled:opacity-50"
        >
          {isSubmitting ? '로그인 중...' : '이메일 로그인'}
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">또는</div>

      <button
        onClick={handleGithubLogin}
        className="w-full rounded border px-3 py-2 font-medium"
      >
        GitHub 계정으로 로그인
      </button>
    </div>
  );
}

'use client';
import { useSession } from 'next-auth/react';
export default function Page() {
  let session = useSession();
  if (session) {
    console.log(session);
  }
}

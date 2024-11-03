'use client';

import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex flex-row items-center justify-between">
        <p>Welcome, {session.user?.name}!</p>
        <button
          onClick={() => signOut()}
          className="bg-slate-900 text-white py-2 rounded-md"
        >
          Sign out
        </button>
      </div>
    );
  }

  const handleSignIn = async () => {
    try {
      const result = await signIn('github', {
        callbackUrl: 'http://localhost:3000',
        redirect: true,
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Failed to sign in');
    }
  };

  return (
    <div>
      <button
        onClick={handleSignIn}
        className="bg-slate-900 text-white px-4 py-2 rounded-md"
      >
        Sign in with GitHub
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

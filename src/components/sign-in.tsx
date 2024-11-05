'use client';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Loader2, Github } from 'lucide-react';

export default function SignIn() {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-slate-900" />
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex flex-row items-center justify-between gap-4 p-2">
        <div className="flex items-center gap-2">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          )}
          <p className="text-sm">Welcome, {session.user?.name}!</p>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 
                     transition-colors flex items-center gap-2 text-sm"
        >
          Sign out
        </button>
      </div>
    );
  }

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      setError(null);
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
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="p-2">
      <button
        onClick={handleSignIn}
        disabled={isSigningIn}
        className="bg-[#222d52] text-white px-4 py-2 rounded-md hover:bg-slate-800 
                   transition-colors flex items-center gap-2 disabled:opacity-50 
                   disabled:cursor-not-allowed"
      >
        {isSigningIn ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Github className="h-4 w-4" />
        )}
        Sign in with GitHub
      </button>
      {error && (
        <div className="flex items-center gap-2 text-red-500 mt-2 text-sm">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

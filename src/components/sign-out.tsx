'use client';

import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="text-sm font-medium text-gray-700 hover:text-gray-500"
    >
      Sign out
    </button>
  );
}

import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

type ApiError = {
  message: string;
  cause?: Error;
  stack?: string;
};

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
    };
  }

  interface JWT {
    accessToken?: string;
  }
}

// declare module 'next-auth/jwt' {
//   interface JWT {
//     accessToken?: string;
//   }
// }

export const { handlers, auth } = NextAuth({
  providers: [GitHub],
  debug: true,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      console.log('SignIn callback - user:', user);
      console.log('SignIn callback - account:', account);

      if (account?.provider === 'github') {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://api:5000';
          console.log('Attempting to connect to API at:', apiUrl);

          const payload = {
            githubId: account.providerAccountId,
            email: user.email,
            name: user.name,
            avatarUrl: user.image,
          };
          console.log('Sending payload:', payload);

          const response = await fetch(`${apiUrl}/api/Auth/github-signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            ...(account.access_token && {
              Authorization: `Bearer ${account.access_token}`,
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('API Response not OK:', {
              status: response.status,
              statusText: response.statusText,
              body: errorText,
            });
            return true;
          }

          const data = await response.json();
          console.log('Successfully saved user:', data);
          return true;
        } catch (error: unknown) {
          const apiError = error as ApiError;
          console.error('Error saving user to database:', {
            message: apiError.message || 'Unknown error',
            cause: apiError.cause,
            stack: apiError.stack,
          });
          return true;
        }
      }
      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
});

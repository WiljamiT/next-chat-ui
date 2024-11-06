import { useState } from 'react';
import { useSession } from 'next-auth/react';

export const useChat = (
  addMessage: (role: 'user' | 'assistant', content: string) => void
) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [remainingMessages, setRemainingMessages] = useState(3);

  const sendMessage = async (userMessage: string) => {
    setError('');
    setLoading(true);
    addMessage('user', userMessage);
    if (!session && remainingMessages <= 0) {
      setError('Message limit reached. Please sign in to continue.');
      setLoading(false);
      return;
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (session?.user?.accessToken) {
        headers['Authorization'] = `Bearer ${session.user.accessToken}`;
        console.log('Sending request with token:', session.user.accessToken);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(session?.user?.accessToken && {
              Authorization: `Bearer ${session.user.accessToken}`,
            }),
          },
          credentials: 'include',
          body: JSON.stringify({
            message: userMessage,
            userId: session?.user?.id || session?.user?.email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          if (!session) {
            setRemainingMessages(prev => Math.max(0, prev - 1));
          }
          throw new Error(data.error || 'Rate limit exceeded');
        }
        throw new Error(data.error || 'Failed to get response');
      }

      if (!session) {
        setRemainingMessages(prev => Math.max(0, prev - 1));
      }

      addMessage('assistant', data.message);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendMessage,
    remainingMessages: !session ? remainingMessages : null,
  };
};

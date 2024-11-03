import { useState } from 'react';

export const useChat = (
  addMessage: (role: 'user' | 'assistant', content: string) => void
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async (userMessage: string) => {
    setError('');
    setLoading(true);

    addMessage('user', userMessage);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      addMessage('assistant', data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendMessage,
  };
};

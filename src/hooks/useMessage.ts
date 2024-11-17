import { useState, useEffect, useRef } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const saved = localStorage.getItem('chatMessages');
      if (saved) {
        try {
          const parsedMessages = JSON.parse(saved);
          setMessages(
            parsedMessages.map((msg: Message) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            }))
          );
        } catch (e) {
          console.error('Error parsing saved messages:', e);
          localStorage.removeItem('chatMessages');
        }
      }
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (initialized.current) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const createMessage = (
    role: 'user' | 'assistant',
    content: string
  ): Message => ({
    id: Date.now().toString(),
    role,
    content,
    timestamp: new Date(),
  });

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    setMessages(prev => [...prev, createMessage(role, content)]);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
    setIsAlertOpen(false);
  };

  return {
    messages,
    addMessage,
    clearMessages,
    isAlertOpen,
    setIsAlertOpen,
  };
};

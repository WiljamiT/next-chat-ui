'use client';
import React from 'react';
import { useChat } from '@/hooks/useChat';
import { useSession, signIn } from 'next-auth/react';
import ChatCard from './Card/ChatCard';
import { useMessages } from '@/hooks/useMessage';

const ChatBot = () => {
  const { messages, addMessage, clearMessages } = useMessages();
  const { loading, error, sendMessage, remainingMessages } =
    useChat(addMessage);
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn('github');
  };

  return (
    <ChatCard
      title="AI Avustaja"
      messages={messages}
      loading={loading}
      error={error}
      onSend={sendMessage}
      onClear={clearMessages}
      onSignIn={handleSignIn}
      remainingMessages={remainingMessages}
      isAuthenticated={!!session}
      disabled={!session && remainingMessages === 0}
    />
  );
};

export default ChatBot;

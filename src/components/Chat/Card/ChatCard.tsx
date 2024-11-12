import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useRef, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageLimit } from './MessageLimit';
import { MessageList } from './MessageList';
import { ChatInput } from '../ChatInput';
import { ChatCardProps } from '@/types';

export const ChatCard: React.FC<ChatCardProps> = ({
  title,
  messages,
  loading,
  error,
  onSend,
  onClear,
  onSignIn,
  remainingMessages,
  isAuthenticated,
  disabled,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="w-full max-w-2xl mx-auto h-[700px] flex flex-col mt-10">
      <ChatHeader
        title={title}
        isAuthenticated={isAuthenticated}
        onSignIn={onSignIn}
        onClear={onClear}
      />
      <CardContent className="flex-1 overflow-hidden">
        {!isAuthenticated && remainingMessages !== null && (
          <MessageLimit
            remainingMessages={remainingMessages}
            onSignIn={onSignIn}
          />
        )}
        <MessageList
          ref={messagesEndRef}
          messages={messages}
          loading={loading}
          error={error}
          isAuthenticated={isAuthenticated}
          onSignIn={onSignIn}
        />
      </CardContent>
      <CardFooter>
        <ChatInput loading={loading} onSubmit={onSend} disabled={disabled} />
      </CardFooter>
    </Card>
  );
};

export default ChatCard;

import { ScrollArea } from '@/components/ui/scroll-area';
import { LoadingIndicator } from './LoadingIndicator';
import { ErrorMessage } from './ErrorMessage';
import { forwardRef } from 'react';
import { ChatMessage } from '../ChatMessage';
import { MessageListProps } from '@/types';

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, loading, error, isAuthenticated, onSignIn }, ref) => (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            showDate={true}
            showSeconds={false}
          />
        ))}
        {loading && <LoadingIndicator />}
        {error && (
          <ErrorMessage
            error={error}
            isAuthenticated={isAuthenticated}
            onSignIn={onSignIn}
          />
        )}
        <div ref={ref} />
      </div>
    </ScrollArea>
  )
);

MessageList.displayName = 'MessageList';

'use client';
import React, { useRef, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, LogIn } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useMessages } from '@/hooks/useMessage';
import { useChat } from '@/hooks/useChat';
import { useSession, signIn } from 'next-auth/react';

const ChatBot = () => {
  const { messages, addMessage, clearMessages } = useMessages();
  const { loading, error, sendMessage, remainingMessages } =
    useChat(addMessage);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (process.env.NODE_ENV === 'development') {
    console.log('Auth status:', status);
    console.log('Session data:', session);
  }

  const handleSignIn = () => {
    signIn('github');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[700px] flex flex-col mt-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI Avustaja</CardTitle>
        <div className="flex gap-2">
          {!session && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignIn}
              className="flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={clearMessages}
            className="text-muted-foreground"
          >
            Tyhjennä
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {!session && remainingMessages !== null && (
          <Alert className="mb-4">
            <div className="flex items-center justify-between">
              <AlertDescription>
                {remainingMessages > 0
                  ? `You have ${remainingMessages} messages remaining. Sign in for unlimited messages.`
                  : 'Message limit reached.'}
              </AlertDescription>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignIn}
                className="ml-4"
              >
                Sign In
              </Button>
            </div>
          </Alert>
        )}
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
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 bg-muted">
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    data-testid="loading-spinner"
                  />
                </div>
              </div>
            )}
            {error && (
              <Alert
                variant="destructive"
                className="mt-2 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </div>
                {!session && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignIn}
                    className="ml-4 bg-background hover:bg-background/90"
                  >
                    Sign In
                  </Button>
                )}
              </Alert>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <ChatInput
          loading={loading}
          onSubmit={sendMessage}
          disabled={!session && remainingMessages === 0}
        />
      </CardFooter>
    </Card>
  );
};

export default ChatBot;

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
import { Loader2, AlertCircle } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useMessages } from '@/hooks/useMessage';
import { useChat } from '@/hooks/useChat';

const ChatBot = () => {
  const { messages, addMessage, clearMessages } = useMessages();
  const { loading, error, sendMessage } = useChat(addMessage);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col mt-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI Avustaja</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={clearMessages}
          className="text-muted-foreground"
        >
          Tyhjennä
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
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
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter>
        <ChatInput loading={loading} onSubmit={sendMessage} />
      </CardFooter>
    </Card>
  );
};

export default ChatBot;

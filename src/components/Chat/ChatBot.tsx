'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const createMessage = (
    role: 'user' | 'assistant',
    content: string
  ): Message => ({
    id: Date.now().toString(),
    role,
    content,
    timestamp: new Date(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setError('');
    setLoading(true);

    setMessages(prev => [...prev, createMessage('user', userMessage)]);

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
      setMessages(prev => [...prev, createMessage('assistant', data.message)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
      localStorage.removeItem('chatMessages');
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col mt-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI Avustaja</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={clearChat}
          className="text-muted-foreground"
        >
          Tyhjennä
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-4'
                      : 'bg-muted'
                  }`}
                >
                  <div>{message.content}</div>
                  <div className="text-xs mt-1 opacity-50">
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
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
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Ctrl + Enter to send)"
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Lähetä'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatBot;

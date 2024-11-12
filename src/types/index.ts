import { Message } from '@/hooks/useMessage';

export interface ChatCardProps {
  title: string;
  messages: Message[];
  loading: boolean;
  error?: string;
  onSend: (message: string) => void;
  onClear: () => void;
  onSignIn: () => void;
  remainingMessages: number | null;
  isAuthenticated: boolean;
  disabled: boolean;
}

export interface ChatHeaderProps {
  title: string;
  isAuthenticated: boolean;
  onSignIn: () => void;
  onClear: () => void;
}

export interface ErrorMessageProps {
  error: string;
  isAuthenticated: boolean;
  onSignIn: () => void;
}

export interface MessageLimitProps {
  remainingMessages: number | null;
  onSignIn: () => void;
}

export interface MessageListProps {
  messages: Message[];
  loading: boolean;
  error?: string;
  isAuthenticated: boolean;
  onSignIn: () => void;
}

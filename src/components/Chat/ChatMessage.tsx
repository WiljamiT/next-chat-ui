import { Message } from '@/hooks/useMessage';
import { formatTimestamp } from '@/utils/dateFormatter';

interface ChatMessageProps {
  message: Message;
  showDate?: boolean;
  showSeconds?: boolean;
}

export const ChatMessage = ({
  message,
  showDate = false,
  showSeconds = false,
}: ChatMessageProps) => {
  return (
    <div
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
          {formatTimestamp(message.timestamp, { showDate, showSeconds })}
        </div>
      </div>
    </div>
  );
};

import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

interface ChatHeaderProps {
  title: string;
  isAuthenticated: boolean;
  onSignIn: () => void;
  onClear: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  isAuthenticated,
  onSignIn,
  onClear,
}) => (
  <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle>{title}</CardTitle>
    <div className="flex gap-2">
      {!isAuthenticated && (
        <Button
          variant="outline"
          size="sm"
          onClick={onSignIn}
          className="flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={onClear}
        className="text-muted-foreground"
      >
        Tyhjennä
      </Button>
    </div>
  </CardHeader>
);

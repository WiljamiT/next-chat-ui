import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  error: string;
  isAuthenticated: boolean;
  onSignIn: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  isAuthenticated,
  onSignIn,
}) => (
  <Alert
    variant="destructive"
    className="mt-2 flex items-center justify-between"
  >
    <div className="flex items-center gap-2">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </div>
    {!isAuthenticated && (
      <Button
        variant="outline"
        size="sm"
        onClick={onSignIn}
        className="ml-4 bg-background hover:bg-background/90"
      >
        Sign In
      </Button>
    )}
  </Alert>
);

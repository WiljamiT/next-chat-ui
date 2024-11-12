import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { MessageLimitProps } from '@/types';

export const MessageLimit: React.FC<MessageLimitProps> = ({
  remainingMessages,
  onSignIn,
}) => (
  <Alert className="mb-4">
    <div className="flex items-center justify-between">
      <AlertDescription>
        {remainingMessages && remainingMessages > 0
          ? `You have ${remainingMessages} messages remaining. Sign in for unlimited messages.`
          : 'Message limit reached.'}
      </AlertDescription>
      <Button variant="outline" size="sm" onClick={onSignIn} className="ml-4">
        Sign In
      </Button>
    </div>
  </Alert>
);

import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

interface SignInButtonProps {
  onSignIn: () => void;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ onSignIn }) => (
  <Button
    variant="outline"
    size="sm"
    onClick={onSignIn}
    className="flex items-center gap-2"
  >
    <LogIn className="h-4 w-4" />
    Sign In
  </Button>
);

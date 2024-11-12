import { CardHeader, CardTitle } from '@/components/ui/card';
import { ClearButton, SignInButton } from '../Buttons';
import { ChatHeaderProps } from '@/types';

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  isAuthenticated,
  onSignIn,
  onClear,
}) => (
  <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle>{title}</CardTitle>
    <div className="flex gap-2">
      {!isAuthenticated && <SignInButton onSignIn={onSignIn} />}
      <ClearButton onClear={onClear} />
    </div>
  </CardHeader>
);

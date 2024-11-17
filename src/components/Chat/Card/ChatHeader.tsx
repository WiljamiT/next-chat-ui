import { CardHeader, CardTitle } from '@/components/ui/card';
import { SignInButton } from '../Buttons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export interface ChatHeaderProps {
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
      {!isAuthenticated && <SignInButton onSignIn={onSignIn} />}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-destructive">
            Tyhjennä
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Poista viestit</AlertDialogTitle>
            <AlertDialogDescription>
              Tätä toimintoa ei voi peruuttaa. Tämä poistaa kaikki viestit
              lopullisesti.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Peruuta</AlertDialogCancel>
            <AlertDialogAction onClick={onClear}>
              Tyhjennä historia
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </CardHeader>
);

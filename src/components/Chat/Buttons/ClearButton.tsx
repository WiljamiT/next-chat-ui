import { Button } from '@/components/ui/button';

interface ClearButtonProps {
  onClear: () => void;
}

export const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => (
  <Button
    variant="outline"
    size="sm"
    onClick={onClear}
    className="text-muted-foreground"
  >
    Tyhjennä
  </Button>
);

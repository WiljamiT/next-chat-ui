import { Loader2 } from 'lucide-react';

export const LoadingIndicator = () => (
  <div className="flex justify-start">
    <div className="rounded-lg px-4 py-2 bg-muted">
      <Loader2 className="h-4 w-4 animate-spin" data-testid="loading-spinner" />
    </div>
  </div>
);

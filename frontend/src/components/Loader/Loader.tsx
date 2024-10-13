import { Loader2 } from 'lucide-react';

export default function Loader({ size = 20 }: { size?: number }) {
  return (
    <Loader2 size={size} className="mr-2 animate-spin" data-testid="loader" />
  );
}
import NavHeader from './NavHeader';
import { cn } from '../../lib/utils'; 

export default function Header({ hasBackground = false }: { hasBackground?: boolean }) {
  return (
    <header 
      className={cn(
        'flex justify-between w-full text-white p-2 bg-white/30 backdrop-blur-md responsive-px', 
        hasBackground && 'absolute top-0 z-50'
      )}
    >
      <NavHeader />
    </header>
  );
}

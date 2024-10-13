import MenuHeader from './MenuHeader/MenuHeader';
import Logo from '../Logo/Logo';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface Props {
  path: string;
  className?: string;
  children: React.ReactNode;
}

function LinkNavHeader({ path, className = '', children }: Props) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => cn(
        `md:text-lg lg:text-xl active:font-bold min-w-fit ${isActive ? 'font-semibold' : 'font-medium'} min-w-[68px] sm:min-w-[72px] inline-block`, className
      )}
    >
      {children}
    </NavLink>
  );
}

export function ButtonNavHeader({ path, className = '', children }: Props) {
  return (
    <NavLink to={path} className={cn(`bg-secondaryDark text-white py-2 rounded-3xl text-center w-24 sm:w-40 font-semibold`, className)}>
      {children}
    </NavLink>
  );
}

export default function NavHeader() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <nav className="flex gap-2 sm:gap-4 items-center justify-between w-full">
      <LinkNavHeader path={isLanding ? "/" : "/dashboard"} className='flex items-center gap-2'>
        <Logo size={12} />
        <p className='md:text-lg lg:text-xl'>BootPlay</p>
      </LinkNavHeader>

      <div className='flex gap-2 sm:gap-4 items-center'>
        {isLanding ? (
          <>
            <ButtonNavHeader path="/signin">Entrar</ButtonNavHeader>
            <ButtonNavHeader path="/signup" className="hidden sm:block bg-homeButton text-secondaryDark">Inscrever-se</ButtonNavHeader>
          </>
        ) : (
          <>
            <LinkNavHeader path="/albums/my-collection">Meus Discos</LinkNavHeader>
            <LinkNavHeader path="/wallet">Carteira</LinkNavHeader>
            <MenuHeader />
          </>
        )}
      </div>
    </nav>
  );
}

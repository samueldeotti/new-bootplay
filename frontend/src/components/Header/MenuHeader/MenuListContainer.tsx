import { useAuth } from '../../../hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon, User } from 'lucide-react';

function MenuListItem({ children, handleClick, testId }: {
  children: React.ReactNode; 
  handleClick: () => void; 
  testId?: string; 
}) {
  return (
    <li
      className="flex gap-2 text-[#807f88] w-full p-2 hover:bg-slate-200 cursor-pointer rounded-lg"
      data-testid={testId}
      onClick={handleClick}
    >
      {children}
    </li>
  );
}

export default function MenuListContainer() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <ul className="flex flex-col mx-2 absolute bg-white rounded-lg w-[100px] right-0 items-center justify-center ring-1 ring-slate-200 z-50">
      <MenuListItem handleClick={() => navigate('/profile')} testId="menu-profile-button">
        <User />
        Perfil
      </MenuListItem>

      <MenuListItem handleClick={logout} testId="menu-logout-button">
        <LogOutIcon />
        Sair
      </MenuListItem>
    </ul>
  );
}

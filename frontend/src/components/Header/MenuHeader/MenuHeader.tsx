import { useState } from 'react';
import avatar from '/assets/avatar.jpg';
import MenuListContainer from './MenuListContainer';

export default function MenuHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="relative"
      onBlur={() => isMenuOpen && setIsMenuOpen(false)}
      data-testid="menu-header"
    >
      <img
        className="size-10 rounded-full cursor-pointer"
        src={avatar}
        alt="User Avatar"
      />
      {isMenuOpen && <MenuListContainer />}
    </button>
  );
}

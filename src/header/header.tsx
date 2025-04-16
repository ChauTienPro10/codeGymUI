import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import './header.scss';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-main">
        <div className="logo">🚀 RocketCoding</div>

        <nav className="header-nav desktop">
          <a href="#">Home</a>
          <a href="#">Challenges</a>
          <a href="#">Leaderboard</a>
          <a href="#">Profile</a>
        </nav>

        <div className="header-icons">
          <div className="menu-toggle" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </div>
          <div className="header-user">
            <User size={22} />
          </div>
        </div>
      </div>

      <nav className={`header-nav mobile ${open ? 'open' : ''}`}>
        <a href="#">Home</a>
        <a href="#">Challenges</a>
        <a href="#">Leaderboard</a>
        <a href="#">Profile</a>
      </nav>
    </header>
  );
};

export default Header;
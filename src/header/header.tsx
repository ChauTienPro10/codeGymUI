import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, User } from 'lucide-react';
import './header.scss';
import '../taiwind.css';

const THIS_APP_URL = process.env.REACT_APP_THIS_URL;
const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="header fixed top-0 left-0 w-full">
      <div className="header-main">
        <div className="logo cursor-pointer"
          onClick={() => navigate("/")}
        >CodeGym</div>

        <nav className="header-nav desktop">
          <a href="/">Home</a>
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
        <a href='/'>Home</a>
        <a href="#">Challenges</a>
        <a href="#">Leaderboard</a>
        <a href="#">Profile</a>
      </nav>
    </header>
  );
};

export default Header;
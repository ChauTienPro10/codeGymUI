import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, X, User } from 'lucide-react';
import './header.scss';
import '../taiwind.css';
import { IoSettings } from "react-icons/io5";
import { useCustomUser } from '../model/User';
import { useLogout } from '../login/useLogout';
import { CiLogin } from "react-icons/ci";

const Header = () => {
  const [key, setKey] = useState(0);
  const handleLogin = () => {
    navigate("/login");
    setKey(key + 1);
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { customUser } = useCustomUser();
  const [showSetting, setShowSetting] = useState(false);
  const { logout, loading } = useLogout()

  const handleLogout = async () => {
    const { error } = await logout()
    if (error) {
      alert("Đăng xuất thất bại: " + error)
    } else {
      navigate("/login");
      window.location.reload()
    }
  }

  return (
    <header 
      key = {key}
      className="header fixed top-0 left-0 w-full">
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

          {/*Khi chua login  */}
          {!isAuthenticated &&(
            <div 
            onClick={() => handleLogin()}
            className="header-user flex items-center gap-2 cursor-pointer hover:bg-gray-500 hover:p-1">
              <p className='text-[12px]'>Login</p>
              <CiLogin className="md:block" size={22} />
            </div>
          )}
          

          {/*Khi da login  */}
          {isAuthenticated && (
            <div className="header-user flex items-center gap-2">
              <User className="hidden md:block" size={22} />
              <p className="text-sm font-medium">{customUser?.name || "Guest"}</p>
              <IoSettings
                className="cursor-pointer text-gray-100 hover:text-gray-400 transition-colors"
                size={20}
                onClick={() => setShowSetting((prev) => !prev)}
              />

              {showSetting && (
                <ul className="absolute top-full right-3 mt-2 w-40 bg-white shadow-md rounded-md text-[10px] text-gray-800 z-10 overflow-hidden">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Quản lý tài khoản</li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Thoát</li>
                </ul>
              )}
            </div>
          )}
          
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



import React from 'react';
import Header from '../header/header';
import CodeEditor from '../code_screen/CodeEditor';
import Login from '../login/login';
import './home.scss';
import '../taiwind.css';
import { Outlet } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      this is home
    </div>
  );
};

export default Home;

import React from 'react';
import Header from './header/header';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="bg-[#2c2c2e] text-white min-h-screen">
      <Header />
      <main className="pt-16">
        <Outlet />  
      </main>
    </div>
  );
};

export default MainLayout;

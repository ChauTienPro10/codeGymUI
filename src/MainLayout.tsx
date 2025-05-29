import React from 'react';
import Header from './header/header';
import Footer from './footer/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="bg-[#2c2c2e] text-white min-h-screen">
      <Header />
      <main className="pt-16">
        <Outlet />  
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

import React from 'react';
import Header from '../header/header';
import CodeEditor from '../code_screen/CodeEditor';
import './home.scss';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="home-content">
        <CodeEditor />
      </main>
    </div>
  );
};

export default Home;

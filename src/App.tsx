import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';
import Login from './login/login';
import CodeEditor from './code_screen/CodeEditor';
import Home from './home/home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* / */}
          <Route path="login" element={<Login />} /> {/* /editor */}
          <Route path="editor" element={<CodeEditor />} /> {/* /editor */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
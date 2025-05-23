import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';
import Login from './login/login';
import CodeEditor from './code_screen/CodeEditor';
import Home from './home/home';
import SignUp from './signup/signup';
import LeetCode from './leet_code/leetCode';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* / */}
          <Route path="login" element={<Login />} /> {/* /editor */}
          <Route path="signup" element={<SignUp />} /> {/* /editor */}
          <Route path="editor/:id" element={<CodeEditor />} /> {/* /editor */}
          <Route path='leet-codes' element={<LeetCode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
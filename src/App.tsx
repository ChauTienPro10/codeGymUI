import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';
import Login from './login/login';
import CodeEditor from './code_screen/CodeEditor';
import Home from './home/home';
import SignUp from './signup/signup';
import LeetCode from './challenges/leetCode';
import OAuthSuccess from './login/oauth-success';
import OAuthFail from './login/oauth-fail';
import Algorithm from './challenges/algorithm';
import ProblemResolve from './challenges/problemResolve';

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
          <Route path='/algorithms' element={<Algorithm />} />
          <Route path='/problem-resolves' element={<ProblemResolve />} />
          <Route path='oauth-success' element={<OAuthSuccess />} />
          
        </Route>
        <Route path='oauth-fail' element={<OAuthFail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
import '../taiwind.css';
import React, { useState, useReducer } from 'react';
import { useLogin } from './useLogin';
import CustomAlert from '../customAlert/alert';
import { alertReducer, initialAlertState } from '../customAlert/alertReducer';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useLoginByGithub } from '../services/Oauth2Services';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [alertState, dispatchAlert] = useReducer(alertReducer, initialAlertState);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useLogin();

  const { loginByGithub } = useLoginByGithub();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await login(username, password);

    if (error) {
      dispatchAlert({
        type: 'SHOW_ALERT',
        payload: {
          message: error,
          type: 'error',
        },
      });
      return;
    }

    if (data) {
      dispatchAlert({
        type: 'SHOW_ALERT',
        payload: {
          message: `Đăng nhập thành công, xin chào ${data.name}`,
          type: 'info',
        },
      });
      navigate('/');
      window.location.reload()
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center" style={{ backgroundColor: '#2c2c2e' }}>
      {alertState.visible && (
        <CustomAlert
          message={alertState.message}
          type={alertState.type}
          onClose={() => dispatchAlert({ type: 'HIDE_ALERT' })}
        />
      )}
      <div className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-green-600">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>

        <div className="space-y-4">
          <p className="text-sm text-gray-500 text-center">
            Don’t have an account?{' '}
            <a href="/signup" className="text-green-600 hover:underline">
              Sign up
            </a>
          </p>

          <div className="flex items-center justify-center space-x-4">
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <FaGithub onClick={() => loginByGithub()} className="text-xl" />
            </button>
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <FaGoogle className="text-xl text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

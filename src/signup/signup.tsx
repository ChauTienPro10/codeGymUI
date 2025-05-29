import '../taiwind.css';
import React, { useState, useReducer } from 'react';
import { useSignup } from './useSignUp';
import { alertReducer, initialAlertState } from '../customAlert/alertReducer';
import CustomAlert from '../customAlert/alert';
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const SignUp: React.FC = () => {


  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertState, dispatchAlert] = useReducer(alertReducer, initialAlertState);
  const [errInfo, setErrInfo] = useState('')

  /**
   * 
   */
  const { signup, loading } = useSignup();

  /**
   * clear data
   */
  const clearData = () => {
    setName('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrInfo('');
  }

  /**
   * 
   * @param e 
   * @returns 
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrInfo("Mật khẩu không khớp!");
      return;
    }
    const { data, error } = await signup(name, username, password);
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
          message: `Đăng ký thành công, tài khoản ${data.id}`,
          type: 'info',
        },
      });
      clearData();
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
        <h2 className="text-2xl font-bold text-center text-green-600">Welcome to CodeGym</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
            />
          </div>

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

          <div>
            <label htmlFor="password-again" className="block text-sm font-medium text-gray-400">Confirm password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
              required
            />
          </div>
          <p className="text-red-500 text-[10px]">{errInfo}</p>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition"
          >
            Register
          </button>
        </form>

        <div className="space-y-4">
          <p className="text-sm text-gray-500 text-center">
            Don have an account?{' '}
            <a href="/login" className="text-green-600 hover:underline">
              Login
            </a>
          </p>

          <div className="flex items-center justify-center space-x-4">
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <FaGithub className="text-xl" />
            </button>
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <FaGoogle className="text-xl text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
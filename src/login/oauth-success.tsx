import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuthSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Lưu token vào localStorage hoặc context
      localStorage.setItem('token', token);

      // Xóa token khỏi URL để sạch sẽ, tránh lộ token
      params.delete('token');
      navigate({ search: params.toString() }, { replace: true });
    } else {
      // Nếu không có token, có thể chuyển hướng về trang đăng nhập hoặc home
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      <h2>Login successful!</h2>
      <p>You have been logged in via OAuth.</p>
    </div>
  );
};

export default OAuthSuccess;

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomUser } from '../model/User';

const OAuthSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const name = params.get('name');
  const idParam = params.get('id');

  const parsedId = idParam && !isNaN(Number(idParam)) ? Number(idParam) : null;

  const user: CustomUser = {
    id: parsedId,
    username: '', // có thể set sau nếu cần
    name: name ?? '',
    jwt: token ?? '',
  };

  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Xoá các param khỏi URL
    params.delete('token');
    params.delete('id');
    params.delete('name');

    navigate({ search: params.toString() }, { replace: true });
  } else {
    navigate('/', { replace: true });
    window.location.reload();

  }
}, [location.search, navigate]);


  return (
    <div>
      <h2>Login successful!</h2>
      <p>You have been logged in via OAuth.</p>
    </div>
  );
};

export default OAuthSuccess;

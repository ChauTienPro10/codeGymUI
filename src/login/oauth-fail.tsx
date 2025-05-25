import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const OAuthFail: React.FC = () => {
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const err = params.get('error');
    setError(err);
  }, [location.search]);

  return (
    <div>
      <h2>Login Failed</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>An unknown error occurred during login.</p>
      )}

      <button>Quay về</button>
    </div>
  );
};

export default OAuthFail;

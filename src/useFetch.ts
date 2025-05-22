import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGenHeader } from './use_features/useGenHeader';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getHeader } = useGenHeader();
  const navigate = useNavigate();

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError(null);
    fetch(url, {method: "GET",headers: getHeader() })
      .then((res) => {
console.log(res)
        if (res.status === 401 || res.status === 403) {
            navigate("/login")
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);
  return { data, loading, error };
}

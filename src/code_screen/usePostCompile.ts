import { useState } from 'react';
import { useGenHeader } from '../use_features/useGenHeader';

type CompileResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  post: (payload: any) => Promise<void>;
};

export function usePostCompile<T = any>(url: string): CompileResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getHeader } = useGenHeader();

  const post = async (payload: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      if (!response.ok || json.code !== 200) {
        setData(null)
        throw new Error(json?.data?.result || 'Unknown error');
      }
      setData(json);  
    } catch (err: any) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
}

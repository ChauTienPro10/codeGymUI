import { useState } from "react";

interface SignUpResponse {
    id: number;
    name: string;
    username: string;
}
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (name: string, username: string, password: string): Promise<{data: SignUpResponse | null; error: string | null}> => {
    setLoading(true);
    setError(null);

    try {   
      const response = await fetch(`${SERVER_URL}/auth/sign_up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, username, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.data) {
        const message = result?.message || "Login failed";
        return { data: null, error: message };
      }
      return { data: result.data, error: null };

    } catch (err: any) {
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};
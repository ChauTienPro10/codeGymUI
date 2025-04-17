// src/hooks/useLogin.ts
import { useState } from "react";

interface LoginResponse {
    id: number;
    name: string;
    username: string;
    jwt: string;
    [key: string]: any; 
}
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      localStorage.setItem("token", result.data.jwt);
      return result;

    } catch (err: any) {
      setError(err.message);
      return null;

    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

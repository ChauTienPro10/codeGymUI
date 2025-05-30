// src/hooks/useLogin.ts
import { json } from "node:stream/consumers";
import { useState } from "react";

interface LoginResponse {
    id: number;
    name: string;
    username: string;
    jwt: string;
    [key: string]: any; 
}
const SERVER_URL = window._env_?.APP_SERVER_URL;
export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (
    username: string,
    password: string
  ): Promise<{ data: LoginResponse | null; error: string | null }> => {
    setLoading(true);
  
    try {
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await response.json();
  
      if (!response.ok || !result.data) {
        const message = result?.message || "Login failed";
        return { data: null, error: message };
      }
  
      localStorage.setItem("token", result.data.jwt);
      localStorage.setItem("user", JSON.stringify(result.data))
      return { data: result.data, error: null };
  
    } catch (err: any) {
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {login, loading};
};

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

  const signup = async (name: string, username: string, password: string): Promise<SignUpResponse | null> => {
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

      if (!response.ok) {
        throw new Error("Signup failed");
      }
      const result = await response.json();
      return result;

    } catch (err: any) {
      setError(err.message);
      return null;

    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};
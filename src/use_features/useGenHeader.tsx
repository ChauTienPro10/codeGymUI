import { useCallback } from "react";

export const useGenHeader = () => {
  const getHeader = useCallback(() => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, []);

  return { getHeader };
};
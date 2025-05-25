import { useState, useEffect } from "react";

export interface CustomUser {
  id: number | null;
  name: string;
  username: string;
  jwt: string;
}

export const useCustomUser = () => {
  const [customUser, setCustomUser] = useState<CustomUser | null>(null);

  useEffect(() => {
    const userJsonString = localStorage.getItem("user");
    if (userJsonString) {
      setCustomUser(JSON.parse(userJsonString));
    }
  }, [localStorage.getItem("user")]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        setCustomUser(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateUser = (user: CustomUser) => {
    setCustomUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return { customUser, updateUser };
};

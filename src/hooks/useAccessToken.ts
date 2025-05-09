"use client";

import { useEffect, useState } from "react";

export const useAccessToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch("/api/access_token", {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();
        setToken(data.token);
      } catch (err) {
        console.error("Error fetching token:", err);
        setToken(null);
      }
    };

    fetchToken();
  }, []);

  return token;
};
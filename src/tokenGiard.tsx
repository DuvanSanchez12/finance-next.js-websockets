/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import  cookies  from "js-cookie";

export const TokenGuard = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const checkToken = () => {
      const token = cookies.get("token");
      if (!token) return;

      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.warn("Token expirado detectado por TokenGuard.");
          logout();
        }
      } catch (error) {
        console.error("Token inválido:", error);
        logout();
      }
    };
    checkToken();
    const interval = setInterval(checkToken, 10000);
    window.addEventListener("focus", checkToken);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", checkToken);
    };
  }, [logout]);

  return null;
};
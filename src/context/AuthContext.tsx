/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
  const token = Cookies.get('token');
  
  if (token) {
    try {
      // 1. Decodificamos la parte media (Payload) del JWT
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));

      // 2. Mapeamos los datos según lo que envía tu Backend (auth.controller.js)
      // Nota: Asegúrate de que tu JWT incluya el username en el payload
      setUser({
        id: payload.id,
        name: payload.username || "Usuario", 
        email: payload.email,
        image: `https://ui-avatars.com/api/?name=${payload.username || 'U'}&background=0D8ABC&color=fff`
      });
    } catch (error) {
      console.error("Error decodificando el token:", error);
      Cookies.remove('token'); // Si el token está corrupto, lo limpiamos
    }
  }
  
  setLoading(false);
}, []);

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
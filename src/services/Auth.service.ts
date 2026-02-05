/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const registerUser = async (userData: any) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error en el registro");
  return data;
};

export const loginUser = async (credentials: any) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Error en el inicio de sesión");

  // Guardamos la cookie aquí porque es una acción del navegador
  if (data.token) {
    Cookies.set('token', data.token, { 
      expires: 1, 
      path: '/', 
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production' 
    });
  }

  return data; // Retornamos todo (incluyendo data.result con la info del user)
};
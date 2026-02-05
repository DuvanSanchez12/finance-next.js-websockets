/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/Auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData); // data contiene { result, token }
        console.log("Datos de login recibidos:", data);
      // Mapeamos 'result' (que es el usuario en tu backend) al objeto 'user' del contexto
      setUser({
        name: data.result.username,
        email: data.result.email,
        image: `https://ui-avatars.com/api/?name=${data.result.username}&background=0D8ABC&color=fff`,
      });

      alert("¡Usuario logueado con éxito!");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0f172a] p-4">
      <h1 className="font-title text-4xl font-bold mb-8 text-blue-500">
        Iniciar Sesión
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e2329] p-8 rounded-xl shadow-2xl w-full max-w-sm border border-slate-800"
      >
        {error && (
          <p className="bg-red-500/10 border border-red-500 text-red-500 text-xs p-3 rounded-md mb-4 text-center">
            {error}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 bg-[#0f172a] border text-white border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="email@ejemplo.com"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            required
            className="w-full px-4 py-3 bg-[#0f172a] border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="••••••••"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all"
        >
          {loading ? "Procesando..." : "Iniciar Sesión"}
        </button>
      </form>
    </main>
  );
}

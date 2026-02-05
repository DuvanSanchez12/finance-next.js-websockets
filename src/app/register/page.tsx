/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/Auth.service"; // Importamos el servicio

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(formData);
      alert("¡Usuario registrado con éxito!");
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white">
      <h1 className="font-title text-4xl font-bold mb-8 text-blue-500">Crear Cuenta</h1>
      
      <form onSubmit={handleSubmit} className="bg-[#1e2329] p-8 rounded-xl shadow-2xl w-full max-w-sm border border-slate-800">
        {error && <p className="bg-red-500/10 border border-red-500 text-red-500 text-xs p-3 rounded-md mb-4 text-center">{error}</p>}
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Nombre de Usuario</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-[#0f172a] border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Tu usuario"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Correo Electrónico</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-[#0f172a] border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="email@ejemplo.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Contraseña</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-[#0f172a] border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? "Procesando..." : "Registrarse Ahora"}
        </button>
      </form>
    </main>
  );
}
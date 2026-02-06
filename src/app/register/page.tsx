/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/Auth.service";
import Link from "next/link";
import { Zap } from "lucide-react";

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
      const data = await registerUser(formData);
      localStorage.setItem("token", data.token);
      // En lugar de alert, podrías usar un toast. Por ahora, redirigimos directo.
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message || "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0b0e117a] p-4 text-white pb-25 pt-20">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
          <Zap size={40} className="text-white fill-current" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Crea tu <span className="text-blue-500">Cuenta</span>
        </h1>
        <p className="text-slate-500 text-sm mt-2">Empieza a financiar tus activos hoy mismo</p>
      </div>
      
      <form 
        onSubmit={handleSubmit} 
        className="bg-[#1e2329] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-800/50"
      >
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-xl mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            {error}
          </div>
        )}
        
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold mb-2 ml-1">
              Nombre de Usuario
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-[#0b0e11] border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
              placeholder="Tu apodo financiero"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold mb-2 ml-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-[#0b0e11] border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
              placeholder="email@ejemplo.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold mb-2 ml-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-[#0b0e11] border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <p className="text-[9px] text-slate-600 mt-2 ml-1 italic">
              * Usa al menos 8 caracteres con números y símbolos.
            </p>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full mt-8 py-3 cursor-pointer rounded-xl font-bold text-sm transition-all shadow-lg ${
            loading 
              ? "bg-blue-600/50 cursor-not-allowed opacity-70" 
              : "bg-blue-600 hover:bg-blue-500 active:scale-[0.98] shadow-blue-600/20 text-white"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creando cuenta...
            </div>
          ) : "Registrarse Ahora"}
        </button>

        <div className="mt-8 text-center border-t border-slate-800/50 pt-6">
          <p className="text-slate-500 text-xs">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-blue-500 font-bold hover:text-blue-400 transition-colors">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
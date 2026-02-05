/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, Zap, User, ChevronDown, LucideLayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="font-sans bg-[#0f172ae6] text-slate-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-slate-800 backdrop-blur-md">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="flex items-center gap-2 group cursor-pointer font-title">
        <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
          <Zap size={24} className="text-white fill-current" />
        </div>
        <Link
          href="/"
          className="ps-1 text-2xl hover:text-blue-400 transition-colors font-bold tracking-tight"
        >
          Finance
        </Link>
      </div>

      {/* Enlaces Centrales */}
      <div className="hidden lg:flex items-center justify-center text-sm font-medium">
        <Link
          href="/dashboard"
          className="text-slate-400 hover:text-white transition-colors"
        >
          Mercado
        </Link>
      </div>

      {/* Autenticación / Perfil */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative" ref={menuRef}>
            {/* Botón del Perfil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center cursor-pointer gap-2 p-1 rounded-full hover:bg-slate-800 transition-colors focus:outline-none"
            >
              <img
                src={user.image}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
              />
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Menú Desplegable (Condicional) */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#1e2329] border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-slate-800 mb-1">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Cuenta
                  </p>
                  <p className="text-sm font-medium text-white truncate">
                    {user.name || "Usuario"}
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <User size={16} /> Perfil
                </Link>

                <Link
                  href="/perfil"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <LucideLayoutDashboard size={16} /> Dashboard
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="flex items-center cursor-pointer gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors mt-1"
                >
                  <LogOut size={16} /> Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-md text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

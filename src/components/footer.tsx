import {  Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b1121] border-t border-slate-800 py-12 px-8 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Zap size={24} className="text-white fill-current" />
            </div>{" "}
            Finance
          </h3>
          <p className="text-slate-400 max-w-xs">
            La plataforma líder para el seguimiento de activos digitales en
            tiempo real. Hecho por un estudiante de la universidad Uniminuto.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">Plataforma</h4>
          <ul className="text-slate-400 space-y-2 text-sm">
            <li>
              <Link href="/dashboard" className="hover:text-white">
                Mercado
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-white">
                Registro
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">Legal</h4>
          <ul className="text-slate-400 space-y-2 text-sm">
            <li>Términos de Servicio</li>
            <li>Política de Privacidad</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
        © 2026 Finance | Duvan. Todos los derechos reservados.
      </div>
    </footer>
  );
}

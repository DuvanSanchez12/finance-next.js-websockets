/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Send } from "lucide-react";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const MarketChat = ({ username }: { username: string }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("chat-message", (msg) => {
      setMessages((prev) => [...prev.slice(-50), msg]); // Guardamos los últimos 50
    });

    return () => { socketRef.current?.disconnect(); };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const msgData = {
      user: username || "Anónimo",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    socketRef.current?.emit("send-chat-message", msgData);
    setInput("");
  };

  return (
    <section className="bg-[#1e2329] flex flex-col h-[500px] rounded-3xl border border-slate-800 overflow-hidden">
      <div className="p-4 border-b border-slate-800 bg-[#1e2329] z-10">
        <h3 className="font-bold flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Chat de la Comunidad
        </h3>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0b0e11]/50">
        {messages.map((m, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{m.user}</span>
              <span className="text-[9px] text-slate-600">{m.time}</span>
            </div>
            <p className="text-sm text-slate-300 bg-[#1e2329] p-3 rounded-2xl rounded-tl-none border border-slate-800 inline-block max-w-[90%]">
              {m.text}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 bg-[#1e2329] border-t border-slate-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe algo..."
            className="w-full bg-[#0b0e11] border border-slate-800 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-blue-500 transition-all"
          />
          <button type="submit" className="absolute right-2 top-1.5 p-1.5 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
            <Send size={18} />
          </button>
        </div>
      </form>
    </section>
  );
};
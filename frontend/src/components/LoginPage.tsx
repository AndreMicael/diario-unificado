import React, { useState } from "react";
import { LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface LoginPageProps {
  onLoggedIn: () => void;
}

export default function LoginPage({ onLoggedIn }: LoginPageProps) {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(identifier || "Convidado");
    onLoggedIn();
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border">
        <div className="flex items-center gap-2 mb-4">
          <LogIn className="text-[#093089]" />
          <h1 className="text-lg font-semibold text-gray-900">
            Acessar apresentação
          </h1>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          Digite qualquer nome ou e-mail para entrar. Use "demo" para ver
          notificações exclusivas do usuário de demonstração.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Seu nome ou e-mail"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#093089]"
          />
          <button
            type="submit"
            className="w-full bg-[#093089] hover:bg-[#0a3a9a] text-white rounded-lg px-4 py-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

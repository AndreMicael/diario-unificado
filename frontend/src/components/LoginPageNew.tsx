import React, { useState } from "react";
import { ArrowLeft, User, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface LoginPageNewProps {
  onBack: () => void;
}

export default function LoginPageNew({ onBack }: LoginPageNewProps) {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Por favor, insira seu nome");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Por favor, insira um e-mail válido");
      return;
    }

    if (!termsAccepted) {
      setError("Você deve aceitar os termos de uso");
      return;
    }

    if (!lgpdAccepted) {
      setError("Você deve aceitar a política de privacidade");
      return;
    }

    login({
      name: name.trim(),
      email: email.trim(),
      termsAccepted,
      lgpdAccepted,
      notificationsEnabled,
    });

    onBack();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Voltar</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Criar conta
            </h1>
            <p className="text-gray-600 text-sm">
              Preencha os dados abaixo para acessar os resultados
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome completo"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#093089] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#093089] focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#093089] rounded focus:ring-[#093089]"
                />
                <span className="text-sm text-gray-700">
                  Aceito os{" "}
                  <a href="#" className="text-[#093089] hover:underline">
                    termos de uso
                  </a>
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={lgpdAccepted}
                  onChange={(e) => setLgpdAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#093089] rounded focus:ring-[#093089]"
                />
                <span className="text-sm text-gray-700">
                  Aceito a{" "}
                  <a href="#" className="text-[#093089] hover:underline">
                    política de privacidade (LGPD)
                  </a>
                </span>
              </label>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#093089] rounded focus:ring-[#093089]"
              />
              <span className="text-sm pl-2 text-gray-700">
                Quero ser notificado quando for mencionado em algum diário do
                estado
              </span>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#093089] hover:bg-[#0a3a9a] text-white py-3 rounded-lg font-medium transition-colors"
            >
              Criar Conta
            </button>

            <p className="text-xs text-gray-500 text-center">
              Seus dados são apenas para demonstração e não serão
              compartilhados.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

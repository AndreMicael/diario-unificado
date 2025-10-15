import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  FileText,
  Users,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Building2,
  Gavel,
  User,
} from "lucide-react";

import Logo from "../../src/public/logo.png";
import BgHeader from "../../src/public/bg-header.jpg";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

interface HomePageProps {
  onSearch: (name: string) => void;
  onLoginClick?: () => void;
}

const faqItems = [
  {
    question: "O que é o Diário Oficial de Mato Grosso?",
    answer:
      "O Diário Oficial é a publicação oficial do governo onde são divulgados atos administrativos, nomeações, licitações e outros documentos de interesse público.",
  },
  {
    question: "Como funciona a busca?",
    answer:
      "Digite seu nome completo no campo de busca e clique no botão. O sistema irá procurar todas as menções do seu nome nos diários oficiais publicados.",
  },
  {
    question: "Quais informações eu preciso fornecer?",
    answer:
      "Para confirmar sua identidade e receber os resultados, você precisará fornecer seu e-mail e telefone, além de aceitar os termos de uso e a política de privacidade.",
  },
  {
    question: "Os resultados são em tempo real?",
    answer:
      "Sim, buscamos nas edições mais recentes do Diário Oficial, incluindo publicações dos últimos dias.",
  },
  {
    question: "Como posso acessar as publicações completas?",
    answer:
      "Nos resultados, você verá um resumo de cada menção com link direto para o documento completo no Diário Oficial.",
  },
];

export default function HomePage({ onSearch, onLoginClick }: HomePageProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState(user?.name || "");
  const [suggestedNames, setSuggestedNames] = useState<string[]>([]);

  React.useEffect(() => {
    if (user?.name) {
      setSearchTerm(user.name);
    }
  }, [user?.name]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("authUser");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.name && typeof parsed.name === "string") {
          setSuggestedNames([parsed.name]);
        }
      }
    } catch {}
  }, []);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const popularServices = [
    { name: "Nomeações", icon: User },
    { name: "Portarias", icon: FileText },
    { name: "Editais", icon: BookOpen },
    { name: "Licitações", icon: Gavel },
  ];

  const featuredServices = [
    {
      title: "Buscar no Diário Oficial",
      description: "Consulte menções ao seu nome nas publicações oficiais",
      icon: FileText,
      color: "bg-blue-600",
    },
    {
      title: "Consultar Publicações",
      description: "Acesse edições recentes do Diário Oficial",
      icon: BookOpen,
      color: "bg-green-600",
    },
    {
      title: "Assistente IA",
      description: "Tire dúvidas sobre documentos oficiais",
      icon: Users,
      color: "bg-purple-600",
    },
  ];

  const stats = [
    { number: "770+", label: "Publicações Diárias", icon: FileText },

    { number: "24/7", label: "Disponibilidade", icon: Clock },
    { number: "100%", label: "Gratuito", icon: CheckCircle },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Main Header */}
      <div
        className="text-white bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BgHeader})` }}
      >
        <div className="absolute inset-0 bg-[#093089] bg-opacity-90 mix-blend-multiply"></div>
        <div className="relative">
          <Navbar userName="Visitante" onLoginClick={onLoginClick} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-4 md:py-8">
          <div className="flex items-center justify-center md:justify-between mb-6 md:mb-8">
            <a href="/">
              <div className="flex items-center space-x-2 md:space-x-4">
                <img
                  src={Logo}
                  alt="Logo"
                  className="aspect-video w-36 md:w-44"
                />
              </div>
            </a>
          </div>

          {/* Search Section */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 px-4">
              Busque seu nome nos diários oficiais.
            </h2>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-full p-1 md:p-2 flex items-center shadow-lg">
                {searchTerm && (
                  <button
                    type="button"
                    aria-label="Limpar"
                    onClick={() => setSearchTerm("")}
                    className="text-gray-400 hover:text-gray-600 pl-3 md:pl-6 pr-2"
                  >
                    <X size={18} className="md:w-5 md:h-5" />
                  </button>
                )}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Digite seu nome completo para buscar nos diários oficiais"
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-500 px-3 md:px-6 py-2 md:py-4 text-sm md:text-lg"
                />
                <button
                  type="submit"
                  className="bg-[#093089] hover:bg-[#0a3a9a] transition-colors text-white p-2 md:p-4 rounded-full ml-1 md:ml-2"
                >
                  <Search size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
            </form>

            <div className="mt-4 md:mt-6">
              <p className="text-blue-100 mb-3 text-sm md:text-base">
                Populares:
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
                {popularServices.map((service, index) => (
                  <button
                    key={index}
                    className="bg-white/10 hover:bg-white/20 text-white px-3 md:px-4 py-1 md:py-2 rounded-full transition-colors flex items-center space-x-1 md:space-x-2 text-xs md:text-sm"
                  >
                    <service.icon size={14} className="md:w-4 md:h-4" />
                    <span className="hidden sm:inline">{service.name}</span>
                    <span className="sm:hidden">
                      {service.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services */}
      <div className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#093089] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Serviços em destaque
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#093089] to-transparent mx-auto"></div>
            <p className="text-gray-600 mt-4 text-base md:text-lg max-w-2xl mx-auto">
              Explore as principais funcionalidades do nosso sistema
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredServices.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="mb-6">
                  <div
                    className={`${service.color} w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <service.icon className="text-white" size={28} />
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-[#093089] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>

                <button className="w-full bg-gradient-to-r from-[#093089] to-[#0a3a9a] text-white font-semibold py-3 px-6 rounded-xl hover:from-[#0a3a9a] hover:to-[#093089] transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg">
                  <span>Acessar</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 md:py-20 bg-gradient-to-br from-[#093089] via-[#0a3a9a] to-[#093089] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-10 w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Fatos e indicadores
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center">
                <div className="mb-6">
                  <div className="bg-white/10 backdrop-blur-sm w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    <stat.icon
                      size={24}
                      className="md:w-8 md:h-8 text-white group-hover:text-blue-100 transition-colors"
                    />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Perguntas frequentes
            </h2>
            <div className="w-24 h-1 bg-[#093089] mx-auto"></div>
          </div>

          <div className="space-y-3 md:space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base md:text-lg font-medium text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`text-gray-500 transition-transform flex-shrink-0 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>

                {expandedFaq === index && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <div className="border-t pt-3 md:pt-4">
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-br from-[#093089] via-[#0a3a9a] to-[#093089] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-5 left-5 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-10 right-10 w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-5 right-1/3 w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Logo Section */}
            <div className="md:col-span-1">
              <img
                src={Logo}
                alt="Logo"
                className="aspect-video w-32 md:w-40 mb-4"
              />
              <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                Sistema oficial de busca nos diários oficiais do estado de Mato
                Grosso.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6 text-base md:text-lg text-white">
                Links Rápidos
              </h4>
              <div className="space-y-3 text-blue-100 text-sm md:text-base">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Diário Oficial
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Consultas
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Legislação
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Ajuda
                </a>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="font-semibold mb-6 text-base md:text-lg text-white">
                Contatos
              </h4>
              <div className="space-y-4 text-blue-100 text-sm md:text-base">
                <div className="flex items-center space-x-3 group">
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Phone size={16} className="text-white" />
                  </div>
                  <span>(65) 3613-6000</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Mail size={16} className="text-white" />
                  </div>
                  <span>contato@mt.gov.br</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <span>Cuiabá - MT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-blue-100 text-sm md:text-base text-center md:text-left">
                © 2025 - Diário Oficial de Mato Grosso - Todos os direitos
                reservados
              </p>
              <div className="flex items-center space-x-6 text-blue-100 text-sm">
                <a href="#" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

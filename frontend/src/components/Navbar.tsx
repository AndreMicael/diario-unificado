import React, { useMemo, useState } from "react";
import { Bell, ChevronDown, Circle, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  read: boolean;
  time: string; // e.g., "há 2h"
}

interface NavbarProps {
  userName?: string;
  onOpenNotifications?: () => void;
  onLoginClick?: () => void;
}

export default function Navbar({
  userName = "Convidado",
  onLoginClick,
}: NavbarProps) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Nova menção encontrada",
      description: "Seu nome apareceu em uma publicação recente.",
      read: false,
      time: "há 2h",
    },
    {
      id: "2",
      title: "Resultado atualizado",
      description: "Uma edição anterior foi revisada.",
      read: false,
      time: "ontem",
    },
    {
      id: "3",
      title: "Bem-vindo!",
      description: "Ative os alertas para receber avisos por e-mail.",
      read: true,
      time: "há 3 dias",
    },
  ]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const shouldShowNotifications =
    !!user && /demo|andre|apresentacao|apresentação/i.test(user.name);

  return (
    <div className="w-full backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!user ? (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <LogIn size={16} />
              <span className="text-sm font-medium">Entrar</span>
            </button>
          ) : (
            <>
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/10"
                  onClick={() => setUserOpen((v) => !v)}
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 text-white grid place-items-center text-[10px] border border-white/30">
                    {(user?.name || userName)?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden sm:inline text-sm text-white">
                    {user?.name || userName}
                  </span>
                  <ChevronDown size={14} className="text-white/70" />
                </button>
                {userOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg border overflow-hidden">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || userName}
                      </p>
                      {user?.email && (
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      )}
                    </div>
                    <ul className="py-1">
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          onClick={logout}
                        >
                          Sair
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  aria-label="Notificações"
                  className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={() => setOpen((v) => !v)}
                >
                  <Bell size={18} className="text-white" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center text-[10px] leading-none px-1.5 py-[2px] rounded-full bg-red-600 text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg border overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b">
                      <span className="text-sm font-medium text-gray-900">
                        Notificações
                      </span>
                      <button
                        className="text-xs text-[#093089] hover:underline"
                        onClick={markAllAsRead}
                      >
                        Marcar todas como lidas
                      </button>
                    </div>
                    <ul className="max-h-80 overflow-auto divide-y">
                      {notifications.length === 0 && (
                        <li className="px-4 py-6 text-sm text-gray-500">
                          Sem notificações
                        </li>
                      )}
                      {notifications.map((n) => (
                        <li key={n.id} className="px-4 py-3 hover:bg-gray-50">
                          <div className="flex items-start gap-2">
                            {!n.read ? (
                              <Circle
                                size={10}
                                className="text-blue-600 mt-1"
                              />
                            ) : (
                              <span className="w-[10px] h-[10px] mt-1" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">
                                  {n.title}
                                </p>
                                <span className="text-[11px] text-gray-500">
                                  {n.time}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                {n.description}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full text-center text-sm text-[#093089] hover:bg-gray-50 py-2">
                      Ver todas
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

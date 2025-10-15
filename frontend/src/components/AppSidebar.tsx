import React, { useMemo, useState } from "react";
import {
  Home,
  FileText,
  MessageCircle,
  Bell,
  Circle,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "./ui/sidebar";
import { useAuth } from "../context/AuthContext";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  read: boolean;
  time: string;
}

export function AppSidebar() {
  const { user } = useAuth();
  const [notifications] = useState<NotificationItem[]>([
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

  const shouldShowNotifications =
    !!user && /demo|andre|apresentacao|apresentação/i.test(user.name);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Início">
                  <Home />
                  <span>Início</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Documentos">
                  <FileText />
                  <span>Documentos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Chat IA">
                  <MessageCircle />
                  <span>Chat IA</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {shouldShowNotifications && (
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Notificações">
                    <Bell />
                    <span>Notificações</span>
                  </SidebarMenuButton>
                  {unreadCount > 0 && (
                    <SidebarMenuBadge>{unreadCount}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Configurações">
                  <Settings />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

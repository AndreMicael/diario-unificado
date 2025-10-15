import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  termsAccepted: boolean;
  lgpdAccepted: boolean;
  notificationsEnabled: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (userData: Omit<AuthUser, "id">) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  const login = (userData: Omit<AuthUser, "id">) => {
    const newUser: AuthUser = {
      id: Date.now().toString(),
      ...userData,
    };
    setUser(newUser);
    localStorage.setItem("authUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    // Força a atualização para garantir que toda a UI volte ao estado deslogado
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}

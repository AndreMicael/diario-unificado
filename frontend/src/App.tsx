import React, { useState } from "react";
import HomePage from "./components/HomePage";
import FormPage from "./components/FormPage";
import ResultsPage from "./components/ResultsPage";
import ChatPage from "./components/ChatPage";
import LoginPageNew from "./components/LoginPageNew";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

interface Document {
  id: number;
  date: string;
  organ: string;
  type: string;
  excerpt: string;
  edition: string;
}

function AppInner() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  const handleSearch = (name: string) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSearchName(name);
    setUserEmail(user.email);
    setUserPhone("(65) 99999-9999");
    navigate("/resultados");
  };

  const handleFormSubmit = (email: string, phone: string) => {
    setUserEmail(email);
    setUserPhone(phone);
    navigate("/resultados");
  };

  const handleBackToHome = () => {
    navigate("/");
    setSearchName("");
    setUserEmail("");
    setUserPhone("");
  };

  const handleOpenChat = (document: Document) => {
    setSelectedDocument(document);
    navigate("/chat");
  };

  const handleBackToResults = () => {
    navigate("/resultados");
    setSelectedDocument(null);
  };

  return (
    <div className="size-full">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onSearch={handleSearch}
              onLoginClick={() => navigate("/login")}
            />
          }
        />
        <Route
          path="/login"
          element={<LoginPageNew onBack={() => navigate(-1)} />}
        />
        <Route
          path="/registro"
          element={<LoginPageNew onBack={() => navigate(-1)} />}
        />
        <Route
          path="/resultados"
          element={
            user ? (
              <ResultsPage
                searchName={searchName}
                userEmail={userEmail}
                onBack={handleBackToHome}
                onOpenChat={handleOpenChat}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/chat"
          element={
            user && selectedDocument ? (
              <ChatPage
                document={selectedDocument}
                searchName={searchName}
                onBack={handleBackToResults}
              />
            ) : (
              <Navigate to="/resultados" replace />
            )
          }
        />
        <Route
          path="/form"
          element={
            <FormPage
              searchName={searchName}
              onSubmit={handleFormSubmit}
              onBack={handleBackToHome}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

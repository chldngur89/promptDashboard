import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import imgEllipse231 from "figma:asset/199f7255b8b99d763083214d0bf3ef52d0340fd6.png";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { Dashboard } from "./pages/Dashboard";
import { AIToolsCatalog } from "./pages/AIToolsCatalog";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewPromptOpen, setIsNewPromptOpen] = useState(false);

  const handleNewPrompt = () => {
    setIsNewPromptOpen(true);
  };

  const handleNewPromptClose = () => {
    setIsNewPromptOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-sidebar flex flex-col">
        <Navigation 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewProject={handleNewPrompt}
          userImage={imgEllipse231}
        />
        
        <main className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  searchQuery={searchQuery} 
                  isNewPromptOpen={isNewPromptOpen}
                  onNewPromptClose={handleNewPromptClose}
                />
              } 
            />
            <Route 
              path="/tools" 
              element={
                <AIToolsCatalog 
                  searchQuery={searchQuery} 
                />
              } 
            />
          </Routes>
        </main>

        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

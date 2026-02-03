import React, { useState, useMemo } from 'react';
import svgPaths from "./imports/svg-pdwo1joi0c";
import imgEllipse231 from "figma:asset/199f7255b8b99d763083214d0bf3ef52d0340fd6.png";
import { Navigation } from "./components/Navigation";
import { PromptGrid } from "./components/PromptGrid";
import { CategoryFilter } from "./components/CategoryFilter";
import { Footer } from "./components/Footer";
import { PromptFormModal } from "./components/PromptFormModal";
import { Toaster } from "./components/ui/sonner";
import { usePrompts } from "./hooks/usePrompts";
import { Prompt } from "./types/prompt";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  
  const { 
    prompts, 
    isLoaded, 
    addPrompt, 
    updatePrompt, 
    deletePrompt, 
    getCategories 
  } = usePrompts();

  const filteredPrompts = useMemo(() => {
    if (!isLoaded) return [];
    
    return prompts.filter(prompt => {
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "전체" || prompt.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [prompts, searchQuery, selectedCategory, isLoaded]);

  const categories = useMemo(() => getCategories(), [getCategories]);

  const handleNewPrompt = () => {
    setEditingPrompt(null);
    setIsFormOpen(true);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setIsFormOpen(true);
  };

  const handleSavePrompt = (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingPrompt) {
      updatePrompt(editingPrompt.id, promptData);
    } else {
      addPrompt(promptData);
    }
    setIsFormOpen(false);
    setEditingPrompt(null);
  };

  const handleDeletePrompt = (id: number) => {
    if (confirm('정말로 이 프롬프트를 삭제하시겠습니까?')) {
      deletePrompt(id);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-sidebar flex items-center justify-center">
        <div className="text-muted-foreground">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sidebar flex flex-col">
      <Navigation 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewProject={handleNewPrompt}
        userImage={imgEllipse231}
      />
      
      <main className="flex-1">
        <div className="bg-sidebar px-4 sm:px-6 lg:px-10 py-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="mb-6">프롬프트 저장소</h1>
            
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <PromptGrid 
              prompts={filteredPrompts} 
              onEdit={handleEditPrompt}
              onDelete={handleDeletePrompt}
            />
          </div>
        </div>
      </main>

      <Footer />

      <PromptFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPrompt(null);
        }}
        onSave={handleSavePrompt}
        editPrompt={editingPrompt}
      />

      <Toaster />
    </div>
  );
}

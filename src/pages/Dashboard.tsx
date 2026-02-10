import React, { useState, useMemo, useEffect } from 'react';
import { PromptGrid } from "../components/PromptGrid";
import { CategoryFilter } from "../components/CategoryFilter";
import { PromptFormModal } from "../components/PromptFormModal";
import { usePrompts } from "../hooks/usePrompts";
import { Prompt } from "../types/prompt";

interface DashboardProps {
  searchQuery: string;
  isNewPromptOpen: boolean;
  onNewPromptClose: () => void;
}

export function Dashboard({ searchQuery, isNewPromptOpen, onNewPromptClose }: DashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const { 
    prompts, 
    isLoaded, 
    addPrompt, 
    updatePrompt, 
    deletePrompt, 
    getCategories 
  } = usePrompts();

  useEffect(() => {
    if (isNewPromptOpen) {
      setEditingPrompt(null);
      setIsFormOpen(true);
    }
  }, [isNewPromptOpen]);

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
    onNewPromptClose();
  };

  const handleDeletePrompt = (id: number) => {
    if (confirm('정말로 이 프롬프트를 삭제하시겠습니까?')) {
      deletePrompt(id);
    }
  };

  const handleCloseModal = () => {
    setIsFormOpen(false);
    setEditingPrompt(null);
    onNewPromptClose();
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-sidebar flex items-center justify-center">
        <div className="text-muted-foreground">로딩 중...</div>
      </div>
    );
  }

  return (
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

      <PromptFormModal
        isOpen={isFormOpen}
        onClose={handleCloseModal}
        onSave={handleSavePrompt}
        editPrompt={editingPrompt}
      />
    </div>
  );
}

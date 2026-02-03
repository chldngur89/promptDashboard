import { useState, useEffect, useCallback } from 'react';
import { Prompt, INITIAL_PROMPTS, CATEGORY_OPTIONS } from '../types/prompt';

const STORAGE_KEY = 'prompt-dashboard-data';
const STORAGE_VERSION = '1.0';

interface StorageData {
  prompts: Prompt[];
  version: string;
}

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (stored) {
      try {
        const data: StorageData = JSON.parse(stored);
        if (data.prompts && Array.isArray(data.prompts)) {
          setPrompts(data.prompts);
          setIsLoaded(true);
          return;
        }
      } catch {
        console.error('Failed to parse stored prompts');
      }
    }

    const initialWithIds = INITIAL_PROMPTS.map((prompt, index) => ({
      ...prompt,
      id: index + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false
    }));
    
    setPrompts(initialWithIds);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const data: StorageData = {
        prompts,
        version: STORAGE_VERSION
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [prompts, isLoaded]);

  const addPrompt = useCallback((promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newId = prompts.length > 0 ? Math.max(...prompts.map(p => p.id)) + 1 : 1;
    const newPrompt: Prompt = {
      ...promptData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false
    };
    setPrompts(prev => [newPrompt, ...prev]);
    return newPrompt;
  }, [prompts]);

  const updatePrompt = useCallback((id: number, promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    setPrompts(prev => prev.map(p => 
      p.id === id 
        ? { ...p, ...promptData, updatedAt: new Date().toISOString() }
        : p
    ));
  }, []);

  const deletePrompt = useCallback((id: number) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setPrompts(prev => prev.map(p => 
      p.id === id 
        ? { ...p, isFavorite: !p.isFavorite }
        : p
    ));
  }, []);

  const exportData = useCallback(() => {
    return {
      prompts,
      exportDate: new Date().toISOString(),
      version: STORAGE_VERSION
    };
  }, [prompts]);

  const importData = useCallback((data: { prompts: Prompt[] }) => {
    if (data.prompts && Array.isArray(data.prompts)) {
      const validatedPrompts = data.prompts.map((p, index) => ({
        ...p,
        id: index + 1,
        createdAt: p.createdAt || new Date().toISOString(),
        updatedAt: p.updatedAt || new Date().toISOString(),
        isFavorite: p.isFavorite || false
      }));
      setPrompts(validatedPrompts);
      return true;
    }
    return false;
  }, []);

  const getCategories = useCallback(() => {
    const uniqueCategories = Array.from(new Set(prompts.map(p => p.category)));
    return uniqueCategories.sort();
  }, [prompts]);

  return {
    prompts,
    isLoaded,
    addPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    exportData,
    importData,
    getCategories,
    categoryOptions: CATEGORY_OPTIONS
  };
}

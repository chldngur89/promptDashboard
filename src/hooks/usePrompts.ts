import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Prompt, INITIAL_PROMPTS, CATEGORY_OPTIONS } from '../types/prompt';

const STORAGE_KEY = 'prompt-dashboard-data';
const STORAGE_VERSION = '1.0';

interface StorageData {
  prompts: Prompt[];
  version: string;
}

const hasSupabaseConfig = () => {
  return !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;
};

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useSupabase, setUseSupabase] = useState(false);

  useEffect(() => {
    const supabaseAvailable = hasSupabaseConfig();
    setUseSupabase(supabaseAvailable);
    
    if (supabaseAvailable) {
      loadFromSupabase();
    } else {
      loadFromLocalStorage();
    }
  }, []);

  const loadFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        loadFromLocalStorage();
        return;
      }
      
      if (data && data.length > 0) {
        const formattedData: Prompt[] = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          categoryColor: item.category_color,
          tags: item.tags || [],
          content: item.content,
          difficulty: item.difficulty,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          isFavorite: item.is_favorite || false
        }));
        setPrompts(formattedData);
      } else {
        const initialWithIds = INITIAL_PROMPTS.map((prompt, index) => ({
          ...prompt,
          id: index + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isFavorite: false
        }));
        setPrompts(initialWithIds);
        await migrateInitialData(initialWithIds);
      }
    } catch (err) {
      console.error('Failed to load from Supabase:', err);
      loadFromLocalStorage();
    } finally {
      setIsLoaded(true);
    }
  };

  const migrateInitialData = async (initialData: Prompt[]) => {
    for (const prompt of initialData) {
      await supabase.from('prompts').insert({
        title: prompt.title,
        description: prompt.description,
        category: prompt.category,
        category_color: prompt.categoryColor,
        tags: prompt.tags,
        content: prompt.content,
        difficulty: prompt.difficulty,
        is_favorite: prompt.isFavorite
      });
    }
  };

  const loadFromLocalStorage = () => {
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
  };

  const saveToLocalStorage = (newPrompts: Prompt[]) => {
    if (!useSupabase) {
      const data: StorageData = {
        prompts: newPrompts,
        version: STORAGE_VERSION
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  };

  const addPrompt = useCallback(async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (useSupabase) {
      const { data, error } = await supabase
        .from('prompts')
        .insert({
          title: promptData.title,
          description: promptData.description,
          category: promptData.category,
          category_color: promptData.categoryColor,
          tags: promptData.tags,
          content: promptData.content,
          difficulty: promptData.difficulty,
          is_favorite: false
        })
        .select();
      
      if (error) {
        console.error('Failed to add prompt:', error);
        return;
      }
      
      if (data && data[0]) {
        const newPrompt: Prompt = {
          id: data[0].id,
          title: data[0].title,
          description: data[0].description,
          category: data[0].category,
          categoryColor: data[0].category_color,
          tags: data[0].tags || [],
          content: data[0].content,
          difficulty: data[0].difficulty,
          createdAt: data[0].created_at,
          updatedAt: data[0].updated_at,
          isFavorite: data[0].is_favorite || false
        };
        setPrompts(prev => [newPrompt, ...prev]);
      }
    } else {
      const newId = prompts.length > 0 ? Math.max(...prompts.map(p => p.id)) + 1 : 1;
      const newPrompt: Prompt = {
        ...promptData,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: false
      };
      const newPrompts = [newPrompt, ...prompts];
      setPrompts(newPrompts);
      saveToLocalStorage(newPrompts);
    }
  }, [prompts, useSupabase]);

  const updatePrompt = useCallback(async (id: number, promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (useSupabase) {
      const { error } = await supabase
        .from('prompts')
        .update({
          title: promptData.title,
          description: promptData.description,
          category: promptData.category,
          category_color: promptData.categoryColor,
          tags: promptData.tags,
          content: promptData.content,
          difficulty: promptData.difficulty,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) {
        console.error('Failed to update prompt:', error);
        return;
      }
      
      setPrompts(prev => prev.map(p => 
        p.id === id 
          ? { ...p, ...promptData, updatedAt: new Date().toISOString() }
          : p
      ));
    } else {
      const newPrompts = prompts.map(p => 
        p.id === id 
          ? { ...p, ...promptData, updatedAt: new Date().toISOString() }
          : p
      );
      setPrompts(newPrompts);
      saveToLocalStorage(newPrompts);
    }
  }, [prompts, useSupabase]);

  const deletePrompt = useCallback(async (id: number) => {
    if (useSupabase) {
      const { error } = await supabase
        .from('prompts')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Failed to delete prompt:', error);
        return;
      }
      
      setPrompts(prev => prev.filter(p => p.id !== id));
    } else {
      const newPrompts = prompts.filter(p => p.id !== id);
      setPrompts(newPrompts);
      saveToLocalStorage(newPrompts);
    }
  }, [prompts, useSupabase]);

  const toggleFavorite = useCallback(async (id: number) => {
    const prompt = prompts.find(p => p.id === id);
    if (!prompt) return;
    
    const newFavoriteStatus = !prompt.isFavorite;
    
    if (useSupabase) {
      const { error } = await supabase
        .from('prompts')
        .update({ is_favorite: newFavoriteStatus })
        .eq('id', id);
      
      if (error) {
        console.error('Failed to toggle favorite:', error);
        return;
      }
    }
    
    const newPrompts = prompts.map(p => 
      p.id === id 
        ? { ...p, isFavorite: newFavoriteStatus }
        : p
    );
    setPrompts(newPrompts);
    
    if (!useSupabase) {
      saveToLocalStorage(newPrompts);
    }
  }, [prompts, useSupabase]);

  const exportData = useCallback(() => {
    return {
      prompts,
      exportDate: new Date().toISOString(),
      version: STORAGE_VERSION
    };
  }, [prompts]);

  const importData = useCallback(async (data: { prompts: Prompt[] }) => {
    if (data.prompts && Array.isArray(data.prompts)) {
      if (useSupabase) {
        for (const prompt of data.prompts) {
          await supabase.from('prompts').insert({
            title: prompt.title,
            description: prompt.description,
            category: prompt.category,
            category_color: prompt.categoryColor,
            tags: prompt.tags,
            content: prompt.content,
            difficulty: prompt.difficulty,
            is_favorite: prompt.isFavorite || false
          });
        }
        await loadFromSupabase();
      } else {
        const validatedPrompts = data.prompts.map((p, index) => ({
          ...p,
          id: index + 1,
          createdAt: p.createdAt || new Date().toISOString(),
          updatedAt: p.updatedAt || new Date().toISOString(),
          isFavorite: p.isFavorite || false
        }));
        setPrompts(validatedPrompts);
        saveToLocalStorage(validatedPrompts);
      }
      return true;
    }
    return false;
  }, [useSupabase]);

  const getCategories = useCallback(() => {
    const uniqueCategories = Array.from(new Set(prompts.map(p => p.category)));
    return uniqueCategories.sort();
  }, [prompts]);

  return {
    prompts,
    isLoaded,
    useSupabase,
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

import { useState, useEffect, useCallback } from 'react';
import { Prompt, INITIAL_PROMPTS, CATEGORY_OPTIONS } from '../types/prompt';

const STORAGE_KEY = 'prompt-dashboard-data';
const STORAGE_VERSION = '1.0';

interface StorageData {
  prompts: Prompt[];
  version: string;
}

let supabase: any = null;

try {
  const supabaseUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL;
  const supabaseKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseKey && supabaseUrl !== 'undefined') {
    import('../lib/supabase').then(module => {
      supabase = module.supabase;
      console.log('✅ Supabase client initialized');
    }).catch(err => {
      console.warn('⚠️ Failed to load Supabase:', err);
    });
  } else {
    console.log('ℹ️ Supabase credentials not found, using localStorage only');
  }
} catch (e) {
  console.log('ℹ️ Running in localStorage mode');
}

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageMode, setStorageMode] = useState<'supabase' | 'localStorage'>('localStorage');

  useEffect(() => {
    // Check if Supabase is available
    const checkSupabase = async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase.from('prompts').select('*').limit(1);
          if (!error) {
            console.log('✅ Supabase connection successful');
            setStorageMode('supabase');
            loadFromSupabase();
            return;
          }
        }
        throw new Error('Supabase not available');
      } catch (err) {
        console.log('ℹ️ Using localStorage mode');
        setStorageMode('localStorage');
        loadFromLocalStorage();
      }
    };

    checkSupabase();
  }, []);

  const loadFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const formattedData: Prompt[] = data.map((item: any) => ({
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
        // Empty DB, use initial data
        const initialWithIds = INITIAL_PROMPTS.map((prompt, index) => ({
          ...prompt,
          id: index + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isFavorite: false
        }));
        setPrompts(initialWithIds);
      }
    } catch (err) {
      console.error('Supabase load failed, falling back to localStorage:', err);
      setStorageMode('localStorage');
      loadFromLocalStorage();
    } finally {
      setIsLoaded(true);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (stored) {
        const data: StorageData = JSON.parse(stored);
        if (data.prompts && Array.isArray(data.prompts)) {
          setPrompts(data.prompts);
          setIsLoaded(true);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to parse localStorage:', e);
    }

    // Use initial data
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
    if (storageMode === 'localStorage') {
      try {
        const data: StorageData = {
          prompts: newPrompts,
          version: STORAGE_VERSION
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
    }
  };

  const addPrompt = useCallback(async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (storageMode === 'supabase' && supabase) {
      try {
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
        
        if (error) throw error;
        
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
      } catch (err) {
        console.error('Supabase add failed, using localStorage:', err);
        // Fallback to localStorage
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
    } else {
      // LocalStorage mode
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
  }, [prompts, storageMode]);

  const updatePrompt = useCallback(async (id: number, promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (storageMode === 'supabase' && supabase) {
      try {
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
        
        if (error) throw error;
        
        setPrompts(prev => prev.map(p => 
          p.id === id 
            ? { ...p, ...promptData, updatedAt: new Date().toISOString() }
            : p
        ));
      } catch (err) {
        console.error('Supabase update failed:', err);
        // Local fallback
        const newPrompts = prompts.map(p => 
          p.id === id 
            ? { ...p, ...promptData, updatedAt: new Date().toISOString() }
            : p
        );
        setPrompts(newPrompts);
        saveToLocalStorage(newPrompts);
      }
    } else {
      const newPrompts = prompts.map(p => 
        p.id === id 
          ? { ...p, ...promptData, updatedAt: new Date().toISOString() }
          : p
      );
      setPrompts(newPrompts);
      saveToLocalStorage(newPrompts);
    }
  }, [prompts, storageMode]);

  const deletePrompt = useCallback(async (id: number) => {
    if (storageMode === 'supabase' && supabase) {
      try {
        const { error } = await supabase
          .from('prompts')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        setPrompts(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.error('Supabase delete failed:', err);
        const newPrompts = prompts.filter(p => p.id !== id);
        setPrompts(newPrompts);
        saveToLocalStorage(newPrompts);
      }
    } else {
      const newPrompts = prompts.filter(p => p.id !== id);
      setPrompts(newPrompts);
      saveToLocalStorage(newPrompts);
    }
  }, [prompts, storageMode]);

  const toggleFavorite = useCallback(async (id: number) => {
    const prompt = prompts.find(p => p.id === id);
    if (!prompt) return;
    
    const newFavoriteStatus = !prompt.isFavorite;
    
    if (storageMode === 'supabase' && supabase) {
      try {
        const { error } = await supabase
          .from('prompts')
          .update({ is_favorite: newFavoriteStatus })
          .eq('id', id);
        
        if (error) throw error;
      } catch (err) {
        console.error('Supabase toggle favorite failed:', err);
      }
    }
    
    const newPrompts = prompts.map(p => 
      p.id === id 
        ? { ...p, isFavorite: newFavoriteStatus }
        : p
    );
    setPrompts(newPrompts);
    
    if (storageMode === 'localStorage') {
      saveToLocalStorage(newPrompts);
    }
  }, [prompts, storageMode]);

  const exportData = useCallback(() => {
    return {
      prompts,
      exportDate: new Date().toISOString(),
      version: STORAGE_VERSION,
      storageMode
    };
  }, [prompts, storageMode]);

  const importData = useCallback(async (data: { prompts: Prompt[] }) => {
    if (data.prompts && Array.isArray(data.prompts)) {
      if (storageMode === 'supabase' && supabase) {
        try {
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
        } catch (err) {
          console.error('Supabase import failed:', err);
          // Local fallback
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
  }, [storageMode]);

  const getCategories = useCallback(() => {
    const uniqueCategories = Array.from(new Set(prompts.map(p => p.category)));
    return uniqueCategories.sort();
  }, [prompts]);

  return {
    prompts,
    isLoaded,
    storageMode,
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

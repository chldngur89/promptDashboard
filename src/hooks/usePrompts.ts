import { useState, useEffect, useCallback } from 'react';
import { Prompt, INITIAL_PROMPTS, CATEGORY_OPTIONS } from '../types/prompt';
import { supabase } from '../lib/supabase';

const STORAGE_VERSION = '1.0';

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFromSupabase = useCallback(async () => {
    try {
      const { data, error: loadError } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });

      if (loadError) throw loadError;

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
          isFavorite: item.is_favorite || false,
        }));
        setPrompts(formattedData);
        return;
      }

      // Empty DB: seed initial prompts once
      const seedData = INITIAL_PROMPTS.map((prompt) => ({
        title: prompt.title,
        description: prompt.description,
        category: prompt.category,
        category_color: prompt.categoryColor,
        tags: prompt.tags,
        content: prompt.content,
        difficulty: prompt.difficulty,
        is_favorite: false,
      }));

      const { data: seeded, error: seedError } = await supabase
        .from('prompts')
        .insert(seedData)
        .select();

      if (seedError) throw seedError;

      if (seeded && seeded.length > 0) {
        const formattedSeeded: Prompt[] = seeded.map((item: any) => ({
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
          isFavorite: item.is_favorite || false,
        }));
        setPrompts(formattedSeeded);
      }
    } catch (err) {
      console.error('Supabase load failed:', err);
      setError('Supabase load failed');
      setPrompts([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadFromSupabase();
  }, [loadFromSupabase]);

  const addPrompt = useCallback(
    async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const { data, error: insertError } = await supabase
          .from('prompts')
          .insert({
            title: promptData.title,
            description: promptData.description,
            category: promptData.category,
            category_color: promptData.categoryColor,
            tags: promptData.tags,
            content: promptData.content,
            difficulty: promptData.difficulty,
            is_favorite: false,
          })
          .select();

        if (insertError) throw insertError;

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
            isFavorite: data[0].is_favorite || false,
          };
          setPrompts((prev) => [newPrompt, ...prev]);
        }
      } catch (err) {
        console.error('Supabase add failed:', err);
        setError('Supabase add failed');
      }
    },
    []
  );

  const updatePrompt = useCallback(
    async (id: number, promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const { error: updateError } = await supabase
          .from('prompts')
          .update({
            title: promptData.title,
            description: promptData.description,
            category: promptData.category,
            category_color: promptData.categoryColor,
            tags: promptData.tags,
            content: promptData.content,
            difficulty: promptData.difficulty,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);

        if (updateError) throw updateError;

        setPrompts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, ...promptData, updatedAt: new Date().toISOString() } : p
          )
        );
      } catch (err) {
        console.error('Supabase update failed:', err);
        setError('Supabase update failed');
      }
    },
    []
  );

  const deletePrompt = useCallback(async (id: number) => {
    try {
      const { error: deleteError } = await supabase.from('prompts').delete().eq('id', id);
      if (deleteError) throw deleteError;
      setPrompts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Supabase delete failed:', err);
      setError('Supabase delete failed');
    }
  }, []);

  const toggleFavorite = useCallback(
    async (id: number) => {
      const prompt = prompts.find((p) => p.id === id);
      if (!prompt) return;

      const newFavoriteStatus = !prompt.isFavorite;

      try {
        const { error: toggleError } = await supabase
          .from('prompts')
          .update({ is_favorite: newFavoriteStatus })
          .eq('id', id);

        if (toggleError) throw toggleError;

        setPrompts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isFavorite: newFavoriteStatus } : p))
        );
      } catch (err) {
        console.error('Supabase toggle favorite failed:', err);
        setError('Supabase toggle favorite failed');
      }
    },
    [prompts]
  );

  const exportData = useCallback(() => {
    return {
      prompts,
      exportDate: new Date().toISOString(),
      version: STORAGE_VERSION,
    };
  }, [prompts]);

  const importData = useCallback(async (data: { prompts: Prompt[] }) => {
    if (!data.prompts || !Array.isArray(data.prompts)) return false;

    try {
      const payload = data.prompts.map((prompt) => ({
        title: prompt.title,
        description: prompt.description,
        category: prompt.category,
        category_color: prompt.categoryColor,
        tags: prompt.tags,
        content: prompt.content,
        difficulty: prompt.difficulty,
        is_favorite: prompt.isFavorite || false,
      }));

      const { error: importError } = await supabase.from('prompts').insert(payload);
      if (importError) throw importError;

      await loadFromSupabase();
      return true;
    } catch (err) {
      console.error('Supabase import failed:', err);
      setError('Supabase import failed');
      return false;
    }
  }, [loadFromSupabase]);

  const getCategories = useCallback(() => {
    const uniqueCategories = Array.from(new Set(prompts.map((p) => p.category)));
    return uniqueCategories.sort();
  }, [prompts]);

  return {
    prompts,
    isLoaded,
    error,
    addPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    exportData,
    importData,
    getCategories,
    categoryOptions: CATEGORY_OPTIONS,
  };
}

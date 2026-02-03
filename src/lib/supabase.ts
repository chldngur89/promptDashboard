import { createClient } from '@supabase/supabase-js';
import type { Prompt } from '../types/prompt';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Falling back to localStorage.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

export type Database = {
  public: {
    Tables: {
      prompts: {
        Row: Prompt;
        Insert: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Prompt>;
      };
    };
  };
};

import React from 'react';
import { Prompt } from '../types/prompt';
import { PromptCard } from './PromptCard';

interface PromptGridProps {
  prompts: Prompt[];
  onEdit?: (prompt: Prompt) => void;
  onDelete?: (id: number) => void;
}

export function PromptGrid({ prompts, onEdit, onDelete }: PromptGridProps) {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {prompts.length === 0 ? "프롬프트가 없습니다. 새로운 프롬프트를 추가해보세요!" : "검색 결과가 없습니다."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <PromptCard 
          key={prompt.id} 
          prompt={prompt} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

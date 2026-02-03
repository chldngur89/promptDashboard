import React from 'react';
import { Copy, Sparkles, Tag } from 'lucide-react';
import { toast } from "sonner@2.0.3";

interface Prompt {
  id: number;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  tags: string[];
  content: string;
  difficulty: string;
}

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    toast.success('프롬프트가 복사되었습니다!');
  };

  return (
    <div
      className="bg-background border border-border rounded cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-[#5B4E96]/50 group flex flex-col h-full"
    >
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        {/* Header: Category and Difficulty */}
        <div className="flex items-center justify-between gap-2">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-0.5 ${prompt.categoryColor}`}>
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] uppercase font-mono text-foreground">
              {prompt.category}
            </span>
          </div>
          
          <div className="text-[10px] uppercase font-mono text-muted-foreground px-2 py-1 bg-sidebar rounded">
            {prompt.difficulty}
          </div>
        </div>

        {/* Title */}
        <h2 className="leading-tight transition-colors group-hover:text-[#5B4E96] min-h-[2.5rem]">
          {prompt.title}
        </h2>

        {/* Description */}
        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
          {prompt.description}
        </p>

        {/* Spacer to push content below to bottom */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="w-full h-px">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 310 2"
          >
            <path
              d="M0 1H310"
              stroke="currentColor"
              strokeDasharray="0.33 1.97"
              strokeWidth="0.611611"
              className="text-foreground"
            />
          </svg>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap min-h-[24px]">
          <Tag className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          {prompt.tags.map((tag, index) => (
            <span
              key={index}
              className="text-[10px] uppercase font-mono text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Copy Button - Always at bottom */}
        <button
          onClick={handleCopy}
          className="w-full px-4 py-2.5 bg-sidebar border border-border rounded flex items-center justify-center gap-2 transition-all hover:bg-[#5B4E96]/10 hover:border-[#5B4E96] hover:text-[#5B4E96] group-hover:shadow-sm"
        >
          <Copy className="w-4 h-4" />
          <span className="text-[12px] font-mono uppercase">프롬프트 복사</span>
        </button>
      </div>
    </div>
  );
}
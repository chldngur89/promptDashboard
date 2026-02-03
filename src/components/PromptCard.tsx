import React, { useState } from 'react';
import { Copy, Sparkles, Tag, MoreVertical, Pencil, Trash2, Star } from 'lucide-react';
import { toast } from "sonner@2.0.3";
import { Prompt } from '../types/prompt';

interface PromptCardProps {
  prompt: Prompt;
  onEdit?: (prompt: Prompt) => void;
  onDelete?: (id: number) => void;
  onToggleFavorite?: (id: number) => void;
}

export function PromptCard({ prompt, onEdit, onDelete, onToggleFavorite }: PromptCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    toast.success('프롬프트가 복사되었습니다!');
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    onEdit?.(prompt);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    onDelete?.(prompt.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(prompt.id);
  };

  return (
    <div
      className="bg-background border border-border rounded cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-[#5B4E96]/50 group flex flex-col h-full relative"
    >
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-0.5 ${prompt.categoryColor}`}>
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] uppercase font-mono text-foreground">
              {prompt.category}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="text-[10px] uppercase font-mono text-muted-foreground px-2 py-1 bg-sidebar rounded">
              {prompt.difficulty}
            </div>
            
            {(onEdit || onDelete) && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className="p-1.5 hover:bg-sidebar rounded transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>
                
                {showMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setShowMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-lg shadow-lg z-50 min-w-[120px] py-1">
                      {onEdit && (
                        <button
                          onClick={handleEdit}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-sidebar flex items-center gap-2 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                          수정
                        </button>
                      )}
                      {onToggleFavorite && (
                        <button
                          onClick={handleToggleFavorite}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-sidebar flex items-center gap-2 transition-colors"
                        >
                          <Star className={`w-4 h-4 ${prompt.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          {prompt.isFavorite ? '즐겨찾기 해제' : '즐겨찾기'}
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={handleDelete}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-sidebar text-red-500 flex items-center gap-2 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          삭제
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <h2 className="leading-tight transition-colors group-hover:text-[#5B4E96] min-h-[2.5rem]">
          {prompt.title}
        </h2>

        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
          {prompt.description}
        </p>

        <div className="flex-1" />

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

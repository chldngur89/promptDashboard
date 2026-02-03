import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from "sonner@2.0.3";
import { Prompt, CATEGORY_OPTIONS, DIFFICULTY_OPTIONS } from '../types/prompt';

interface PromptFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editPrompt?: Prompt | null;
}

export function PromptFormModal({ isOpen, onClose, onSave, editPrompt }: PromptFormModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0].name);
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] = useState<typeof DIFFICULTY_OPTIONS[number]>(DIFFICULTY_OPTIONS[0]);

  useEffect(() => {
    if (editPrompt) {
      setTitle(editPrompt.title);
      setDescription(editPrompt.description);
      setCategory(editPrompt.category);
      setTags(editPrompt.tags.join(", "));
      setContent(editPrompt.content);
      setDifficulty(editPrompt.difficulty);
    } else {
      setTitle("");
      setDescription("");
      setCategory(CATEGORY_OPTIONS[0].name);
      setTags("");
      setContent("");
      setDifficulty(DIFFICULTY_OPTIONS[0]);
    }
  }, [editPrompt, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !content.trim()) {
      toast.error("제목, 설명, 프롬프트 내용은 필수입니다.");
      return;
    }

    const categoryData = CATEGORY_OPTIONS.find(c => c.name === category);
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);

    onSave({
      title: title.trim(),
      description: description.trim(),
      category,
      categoryColor: categoryData?.color || CATEGORY_OPTIONS[0].color,
      tags: tagsArray,
      content: content.trim(),
      difficulty
    });

    toast.success(editPrompt ? "프롬프트가 수정되었습니다!" : "새 프롬프트가 추가되었습니다!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      <div className="relative bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl">{editPrompt ? "프롬프트 수정" : "새 프롬프트 추가"}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sidebar rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-mono uppercase text-muted-foreground mb-2">
              제목 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-sidebar border border-border rounded focus:outline-none focus:ring-2 focus:ring-[#5B4E96] transition-all"
              placeholder="프롬프트 제목을 입력하세요"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono uppercase text-muted-foreground mb-2">
                카테고리 *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-sidebar border border-border rounded focus:outline-none focus:ring-2 focus:ring-[#5B4E96] transition-all"
              >
                {CATEGORY_OPTIONS.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono uppercase text-muted-foreground mb-2">
                난이도 *
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as typeof DIFFICULTY_OPTIONS[number])}
                className="w-full px-4 py-2.5 bg-sidebar border border-border rounded focus:outline-none focus:ring-2 focus:ring-[#5B4E96] transition-all"
              >
                {DIFFICULTY_OPTIONS.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-mono uppercase text-muted-foreground mb-2">
              설명 *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-sidebar border border-border rounded focus:outline-none focus:ring-2 focus:ring-[#5B4E96] transition-all resize-none"
              placeholder="프롬프트에 대한 간단한 설명을 입력하세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono uppercase text-muted-foreground mb-2">
              태그 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2.5 bg-sidebar border border-border rounded focus:outline-none focus:ring-2 focus:ring-[#5B4E96] transition-all"
              placeholder="예: 사실적, 조명, 카메라"
            />
          </div>

          <div>
            <label className="block text-sm font-mono uppercase text-muted-foreground mb-2">
              프롬프트 내용 *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-2.5 bg-sidebar border border-border rounded focus:outline-none focus:ring-2 focus:ring-[#5B4E96] transition-all resize-none font-mono text-sm"
              placeholder="실제 프롬프트 내용이나 템플릿을 입력하세요"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-border rounded hover:bg-sidebar transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#5B4E96] text-white rounded hover:bg-[#4a3d7a] transition-colors"
            >
              {editPrompt ? "수정" : "추가"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

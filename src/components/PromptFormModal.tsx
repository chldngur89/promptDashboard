import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
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

interface PromptFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: Omit<Prompt, 'id'>) => void;
  editPrompt?: Prompt | null;
}

const categoryOptions = [
  { name: "이미지 생성", color: "bg-[#cae3ff] border-[#a6d1ff]" },
  { name: "코딩", color: "bg-[#e0f4bf] border-[#cbec95]" },
  { name: "글쓰기", color: "bg-[#feec91] border-[#fedf47]" },
  { name: "데이터 분석", color: "bg-[#dddbfd] border-[#c6c3fb]" },
  { name: "번역", color: "bg-[#fadcbb] border-[#f7c48d]" }
];

const difficultyOptions = ["초급", "중급", "고급"];

export function PromptFormModal({ isOpen, onClose, onSave, editPrompt }: PromptFormModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("이미지 생성");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] = useState("초급");

  useEffect(() => {
    if (editPrompt) {
      setTitle(editPrompt.title);
      setDescription(editPrompt.description);
      setCategory(editPrompt.category);
      setTags(editPrompt.tags.join(", "));
      setContent(editPrompt.content);
      setDifficulty(editPrompt.difficulty);
    } else {
      // Reset form when opening for new prompt
      setTitle("");
      setDescription("");
      setCategory("이미지 생성");
      setTags("");
      setContent("");
      setDifficulty("초급");
    }
  }, [editPrompt, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !content.trim()) {
      toast.error("제목, 설명, 프롬프트 내용은 필수입니다.");
      return;
    }

    const categoryData = categoryOptions.find(c => c.name === category);
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);

    onSave({
      title: title.trim(),
      description: description.trim(),
      category,
      categoryColor: categoryData?.color || categoryOptions[0].color,
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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl">{editPrompt ? "프롬프트 수정" : "새 프롬프트 추가"}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sidebar rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
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

          {/* Category and Difficulty */}
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
                {categoryOptions.map(cat => (
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
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-2.5 bg-sidebar border border-border rounded focus:outline-none focus:ring-2 focus:ring-[#5B4E96] transition-all"
              >
                {difficultyOptions.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
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

          {/* Tags */}
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

          {/* Content */}
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

          {/* Buttons */}
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

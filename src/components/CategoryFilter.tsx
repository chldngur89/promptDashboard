import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap mb-6">
      <button
        onClick={() => onCategoryChange('전체')}
        className={`px-4 py-2 rounded-full text-[12px] font-mono uppercase transition-all ${
          selectedCategory === '전체'
            ? 'bg-[#5B4E96] text-white border border-[#5B4E96]'
            : 'bg-sidebar border border-border text-foreground hover:border-[#5B4E96] hover:text-[#5B4E96]'
        }`}
      >
        전체
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-[12px] font-mono uppercase transition-all ${
            selectedCategory === category
              ? 'bg-[#5B4E96] text-white border border-[#5B4E96]'
              : 'bg-sidebar border border-border text-foreground hover:border-[#5B4E96] hover:text-[#5B4E96]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { AIToolCard } from '../components/AIToolCard';
import { AIToolFilter } from '../components/AIToolFilter';
import { AI_TOOLS_DATA, AIToolCategory } from '../types/ai-tools';

interface AIToolsCatalogProps {
  searchQuery: string;
}

export function AIToolsCatalog({ searchQuery }: AIToolsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<AIToolCategory | 'All'>('All');
  const [selectedPricing, setSelectedPricing] = useState<string | 'All'>('All');

  const filteredTools = useMemo(() => {
    return AI_TOOLS_DATA.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesPricing = selectedPricing === 'All' || tool.pricing === selectedPricing;
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesPricing && matchesSearch;
    });
  }, [selectedCategory, selectedPricing, searchQuery]);

  return (
    <div className="bg-sidebar px-4 sm:px-6 lg:px-10 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-foreground">AI 도구 카탈로그</h1>
        
        <AIToolFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPricing={selectedPricing}
          onPricingChange={setSelectedPricing}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <AIToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { AIToolCategory, AI_TOOL_CATEGORIES, PRICING_LABELS } from '../types/ai-tools';

interface AIToolFilterProps {
  selectedCategory: AIToolCategory | 'All';
  onCategoryChange: (category: AIToolCategory | 'All') => void;
  selectedPricing: string | 'All';
  onPricingChange: (pricing: string | 'All') => void;
}

export function AIToolFilter({ 
  selectedCategory, 
  onCategoryChange, 
  selectedPricing, 
  onPricingChange 
}: AIToolFilterProps) {
  
  const pricingOptions = ['All', ...Object.keys(PRICING_LABELS)];

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === 'All'
              ? "bg-primary text-primary-foreground shadow-md scale-105"
              : "bg-sidebar border border-sidebar-border text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          }`}
        >
          전체
        </button>
        {AI_TOOL_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : "bg-sidebar border border-sidebar-border text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium">가격:</span>
        {pricingOptions.map((pricing) => (
          <button
            key={pricing}
            onClick={() => onPricingChange(pricing)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
              selectedPricing === pricing
                ? "bg-secondary text-secondary-foreground"
                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            {pricing === 'All' ? '전체' : PRICING_LABELS[pricing]?.label || pricing}
          </button>
        ))}
      </div>
    </div>
  );
}

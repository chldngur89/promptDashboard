import React from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { AITool, AI_TOOL_CATEGORIES, PRICING_LABELS } from '../types/ai-tools';

interface AIToolCardProps {
  tool: AITool;
}

export function AIToolCard({ tool }: AIToolCardProps) {
  const handleVisit = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  const categoryOption = AI_TOOL_CATEGORIES.find(c => c.id === tool.category);
  const pricingInfo = PRICING_LABELS[tool.pricing];

  return (
    <div className="bg-background border border-border rounded cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-[#5B4E96]/50 group flex flex-col h-full relative">
      <div className="p-5 space-y-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-0.5 ${categoryOption?.color || 'bg-gray-100 border-gray-200'}`}>
            <span className="text-[10px] uppercase font-mono font-semibold">
              {categoryOption?.name || tool.category}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            {tool.rank && (
              <div className="text-[10px] uppercase font-mono text-muted-foreground px-2 py-1 bg-sidebar rounded flex items-center gap-1">
                <span>Rank #{tool.rank}</span>
              </div>
            )}
            <div className={`text-[10px] uppercase font-mono px-2 py-1 rounded border ${pricingInfo?.color} ${pricingInfo?.textColor}`}>
              {pricingInfo?.label || tool.pricing}
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold leading-tight transition-colors group-hover:text-[#5B4E96]">
            {tool.name}
          </h2>
        </div>

        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
          {tool.description}
        </p>

        <div className="flex-1" />

        <div className="w-full h-px my-2">
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
              className="text-foreground/20"
            />
          </svg>
        </div>

        <div className="flex items-center gap-2 flex-wrap min-h-[24px]">
          <Tag className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          {tool.tags.map((tag, index) => (
            <span
              key={index}
              className="text-[10px] uppercase font-mono text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={handleVisit}
          className="w-full px-4 py-2.5 bg-sidebar border border-border rounded flex items-center justify-center gap-2 transition-all hover:bg-[#5B4E96]/10 hover:border-[#5B4E96] hover:text-[#5B4E96] group-hover:shadow-sm mt-2"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-[12px] font-mono uppercase">Visit Website</span>
        </button>
      </div>
    </div>
  );
}

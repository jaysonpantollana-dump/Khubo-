import React from 'react';
import * as Icons from 'lucide-react';
import { CATEGORIES } from '../data/listings';
import { cn } from '../lib/utils';

interface CategoriesProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function Categories({ selectedCategory, onSelect }: CategoriesProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-2 sm:py-4 bg-white w-full relative">
      <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <button 
        onClick={() => scroll('left')}
        className="absolute left-[-4px] top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white border border-gray-400 rounded-full hover:bg-gray-50 active:scale-95 transition-all hidden md:block"
        aria-label="Scroll left"
      >
        <Icons.ChevronLeft size={18} className="text-gray-800" />
      </button>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-[-4px] top-1/2 -translate-y-1/2 z-20 p-1.5 bg-white border border-gray-400 rounded-full hover:bg-gray-50 active:scale-95 transition-all hidden md:block"
        aria-label="Scroll right"
      >
        <Icons.ChevronRight size={18} className="text-gray-800" />
      </button>

      <div 
        ref={scrollRef}
        className="flex flex-row items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth px-0 sm:px-6 w-full touch-pan-x"
      >
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.label;

          return (
            <button
              key={category.label}
              onClick={() => onSelect(category.label)}
              className={cn(
                "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-[11px] sm:text-[13px] font-bold transition-all duration-200 whitespace-nowrap flex-shrink-0",
                isSelected 
                   ? "bg-black text-white border-black" 
                   : "bg-white text-gray-700 border-gray-300 hover:border-black"
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

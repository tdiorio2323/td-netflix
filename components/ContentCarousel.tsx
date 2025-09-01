import React, { useRef } from 'react';
import { Movie } from '../types';
import { ContentCard } from './ContentCard';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface ContentCarouselProps {
  title: string;
  movies: Movie[];
}

export const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const amount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - amount : scrollLeft + amount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="px-4 md:px-12 lg:px-24 group/carousel relative">
      <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
      <div className="absolute top-0 bottom-0 -left-4 z-20 items-center justify-center hidden md:flex opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
        <button onClick={() => scroll('left')} className="bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors" aria-label="Scroll left">
          <ChevronLeftIcon className="w-8 h-8"/>
        </button>
      </div>
      <div ref={scrollRef} className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar">
        {movies.map(movie => (
          <ContentCard key={movie.id} movie={movie} />
        ))}
      </div>
       <div className="absolute top-0 bottom-0 -right-4 z-20 items-center justify-center hidden md:flex opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
        <button onClick={() => scroll('right')} className="bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors" aria-label="Scroll right">
          <ChevronRightIcon className="w-8 h-8"/>
        </button>
      </div>
    </div>
  );
};
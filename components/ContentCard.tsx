import React from 'react';
import { Movie } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { PlusIcon } from './icons/PlusIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface ContentCardProps {
  movie: Movie;
}

export const ContentCard: React.FC<ContentCardProps> = ({ movie }) => {
  return (
    <div className="group relative flex-shrink-0 w-40 md:w-48 lg:w-56 cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out shadow-lg hover:shadow-red-500/30 hover:scale-110 hover:z-20">
      <img src={movie.posterUrl} alt={movie.title} className="w-full h-auto object-cover rounded-lg" />
      
      <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between">
        {/* Expanded info appears on hover, within the scaled card */}
        <div className="absolute -bottom-1 left-0 right-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100 bg-[#121212] rounded-lg translate-y-4 group-hover:translate-y-0 shadow-2xl flex flex-col justify-end p-3">
            <div className="flex items-center justify-between">
                <h4 className="text-white text-sm font-bold truncate flex-1">{movie.title}</h4>
            </div>
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200" aria-label="Play">
                        <PlayIcon className="w-5 h-5 ml-0.5"/>
                    </button>
                    <button className="w-8 h-8 rounded-full border-2 border-gray-400 text-white flex items-center justify-center hover:border-white" aria-label="Add to my list">
                        <PlusIcon className="w-5 h-5"/>
                    </button>
                </div>
                <button className="w-8 h-8 rounded-full border-2 border-gray-400 text-white flex items-center justify-center hover:border-white" aria-label="More info">
                    <ChevronDownIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
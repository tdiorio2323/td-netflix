import React from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { InfoIcon } from './icons/InfoIcon';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[56.25vw] max-h-[800px] min-h-[400px] w-full">
      <img src="https://picsum.photos/seed/hero/1600/900" alt="Featured Content" className="absolute top-0 left-0 w-full h-full object-cover hero-image-animate" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-black/60 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-12 lg:px-24 w-full lg:w-1/2">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-lg">Echoes of the Void</h2>
        <p className="mt-4 text-md md:text-lg text-gray-200 max-w-xl drop-shadow-md">
          In a future where humanity has colonized the stars, a lone explorer discovers an ancient signal that could either be the key to interstellar evolution or the harbinger of cosmic doom.
        </p>
        <div className="mt-6 flex items-center space-x-4">
          <button className="flex items-center justify-center bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition-colors duration-300">
            <PlayIcon className="w-6 h-6 mr-2" />
            Play
          </button>
          <button className="flex items-center justify-center bg-gray-500/70 text-white px-6 py-2 rounded font-semibold hover:bg-gray-500/90 transition-colors duration-300 backdrop-blur-sm">
            <InfoIcon className="w-6 h-6 mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
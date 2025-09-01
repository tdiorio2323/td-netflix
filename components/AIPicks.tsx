import React, { useState, useEffect } from 'react';
import { AIRecommendation } from '../types';
import { generateRecommendations } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { PlusIcon } from './icons/PlusIcon';
import { CheckIcon } from './icons/CheckIcon';

export const AIPicks: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedWatchlist = localStorage.getItem('watchlist');
      if (storedWatchlist) {
        const parsed: AIRecommendation[] = JSON.parse(storedWatchlist);
        setWatchlist(parsed.map(item => item.title));
      }
    } catch (e) {
      console.error("Failed to parse watchlist from localStorage", e);
      localStorage.removeItem('watchlist'); // Clear corrupted data
    }
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a mood or a movie idea.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setExpandedTitle(null); // Reset expanded state on new generation

    try {
      const result = await generateRecommendations(prompt);
      setRecommendations(result);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWatchlist = (recommendation: AIRecommendation) => {
    try {
      const storedWatchlist = localStorage.getItem('watchlist') || '[]';
      const currentWatchlist: AIRecommendation[] = JSON.parse(storedWatchlist);

      if (!currentWatchlist.some(item => item.title === recommendation.title)) {
        const newWatchlist = [...currentWatchlist, recommendation];
        localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
        setWatchlist(prev => [...prev, recommendation.title]);
      }
    } catch (e) {
      console.error("Failed to update watchlist in localStorage", e);
      setError("Could not save to your watchlist.");
    }
  };

  const handleToggleExpand = (title: string) => {
    setExpandedTitle(prevTitle => (prevTitle === title ? null : title));
  };


  return (
    <div className="px-4 md:px-12 lg:px-24 py-8 bg-gray-900/50 rounded-lg mx-4 md:mx-12 lg:mx-24">
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">AI Picks For You</h3>
        <p className="text-gray-400 mb-6">Tell us what you're in the mood for, and our AI will create and visualize the perfect movies!</p>
        
        <div className="relative">
           <SparklesIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"/>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleGenerate()}
            placeholder="e.g., a sci-fi comedy with a talking dog"
            className="w-full pl-10 pr-32 sm:pr-40 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-red-600 text-white px-4 sm:px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors duration-300 disabled:bg-red-800 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>

      {isLoading && (
        <div className="flex flex-col justify-center items-center mt-8 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <p className="text-gray-400">Our AI is generating posters... this may take a moment.</p>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((rec, index) => {
            const isInWatchlist = watchlist.includes(rec.title);
            const isExpanded = expandedTitle === rec.title;
            return (
              <div key={index} className="group relative bg-[#121212] rounded-lg overflow-hidden border border-gray-800 hover:border-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                <img src={rec.posterUrl} alt={`Poster for ${rec.title}`} className="w-full h-auto object-cover aspect-[3/4]" />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <h4 className="text-lg font-bold text-white drop-shadow-md">{rec.title}</h4>
                  
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-64' : 'max-h-[3.75rem]'}`}>
                    <p className="text-gray-300 text-sm mt-1 drop-shadow-sm">
                      {rec.plot}
                    </p>
                  </div>

                  <div className={`mt-4 space-y-2 transition-all duration-300 ease-in-out delay-100 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                    <button
                        onClick={() => handleToggleExpand(rec.title)}
                        className="w-full flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-white/20 transition-colors duration-300"
                    >
                        {isExpanded ? 'Show Less' : 'View More Details'}
                    </button>
                    <button
                      onClick={() => handleAddToWatchlist(rec)}
                      disabled={isInWatchlist}
                      className="w-full flex items-center justify-center text-sm bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-md font-semibold hover:bg-white/30 transition-colors duration-300 disabled:bg-green-500/40 disabled:text-white disabled:cursor-not-allowed"
                    >
                      {isInWatchlist ? (
                        <>
                          <CheckIcon className="w-5 h-5 mr-2" />
                          Added
                        </>
                      ) : (
                        <>
                          <PlusIcon className="w-5 h-5 mr-2" />
                          Add to Watchlist
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

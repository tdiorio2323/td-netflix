import React, { useState } from 'react';
import { Post } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { CommentIcon } from './icons/CommentIcon';
import { ShareIcon } from './icons/ShareIcon';
import { MoreIcon } from './icons/MoreIcon';
import { LockIcon } from './icons/LockIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { StarIcon } from './icons/StarIcon';
import { CheckIcon } from './icons/CheckIcon';


interface PostCardProps {
  post: Post;
  onSubscribe: (username: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onSubscribe }) => {
  const [isTipped, setIsTipped] = useState(false);
  const isLocked = post.isExclusive && !post.user.isSubscribed;

  const handleTip = () => {
    setIsTipped(true);
    setTimeout(() => setIsTipped(false), 2000);
  }

  return (
    <div className="bg-[#121212] border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-900/20">
      <div className="flex items-center p-3 justify-between">
        <div className="flex items-center space-x-3">
          <img src={post.user.avatarUrl} alt={post.user.username} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold text-sm">{post.user.username}</span>
          {post.isExclusive && <StarIcon className="w-4 h-4 text-yellow-400" title="Exclusive Content" />}
        </div>
        <div className="flex items-center space-x-2">
            {!post.user.isSubscribed ? (
                <button onClick={() => onSubscribe(post.user.username)} className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-md hover:bg-red-700 transition-colors">
                    Subscribe
                </button>
            ) : (
                <div className="flex items-center space-x-1 text-green-400 text-xs font-bold border border-green-400/50 rounded-md px-2 py-1">
                    <CheckIcon className="w-4 h-4"/>
                    <span>Subscribed</span>
                </div>
            )}
             <button aria-label="More options">
                <MoreIcon className="w-6 h-6 text-gray-400" />
            </button>
        </div>
      </div>
      
      <div className="relative">
        <img src={post.imageUrl} alt="Post content" className={`w-full h-auto object-cover transition-all duration-300 ${isLocked ? 'blur-xl' : 'blur-0'}`} />
        {isLocked && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center p-4">
                <LockIcon className="w-12 h-12 text-white mb-4"/>
                <h4 className="text-lg font-bold">Exclusive Content</h4>
                <p className="text-gray-300 text-sm mb-4">Subscribe to see this post from {post.user.username}.</p>
                <button 
                    onClick={() => onSubscribe(post.user.username)} 
                    className="bg-red-600 text-white px-6 py-2 text-md font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                >
                    Subscribe for ${post.user.subscriptionPrice}/month
                </button>
            </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center mb-2">
            <div className="flex items-center space-x-4">
                <button aria-label="Like post" className="group/icon">
                    <HeartIcon className="w-7 h-7 text-gray-400 group-hover/icon:text-red-500 cursor-pointer transition-colors" />
                </button>
                <button aria-label="Comment on post" className="group/icon">
                    <CommentIcon className="w-7 h-7 text-gray-400 group-hover/icon:text-white cursor-pointer transition-colors" />
                </button>
                <button aria-label="Share post" className="group/icon">
                    <ShareIcon className="w-7 h-7 text-gray-400 group-hover/icon:text-white cursor-pointer transition-colors" />
                </button>
                <div className="relative">
                    <button onClick={handleTip} aria-label="Tip creator" className="group/icon">
                        <DollarSignIcon className="w-7 h-7 text-gray-400 group-hover/icon:text-yellow-500 cursor-pointer transition-colors" />
                    </button>
                    {isTipped && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
                            Tipped!
                        </span>
                    )}
                </div>
            </div>
        </div>
        
        <p className="font-semibold text-sm">{post.likes.toLocaleString()} likes</p>
        
        <div className="mt-2 text-sm">
          <span className="font-semibold mr-2">{post.user.username}</span>
          <span>{post.caption}</span>
        </div>
        
        <p className="text-gray-500 text-xs mt-2 cursor-pointer">
          View all {post.commentsCount} comments
        </p>
      </div>
    </div>
  );
};
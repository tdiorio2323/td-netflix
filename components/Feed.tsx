
import React from 'react';
import { Post } from '../types';
import { PostCard } from './PostCard';

interface FeedProps {
  posts: Post[];
  onSubscribe: (username: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ posts, onSubscribe }) => {
  return (
    <div className="px-4 md:px-12 lg:px-24 py-8">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">Community Feed</h3>
      <div className="max-w-xl mx-auto space-y-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onSubscribe={onSubscribe} />
        ))}
      </div>
    </div>
  );
};

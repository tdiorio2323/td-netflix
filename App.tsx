
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ContentCarousel } from './components/ContentCarousel';
import { AIPicks } from './components/AIPicks';
import { Feed } from './components/Feed';
import { Movie, Post } from './types';

// Mock Data
const mockMovies: Movie[] = Array.from({ length: 10 }, (_, i) => ({
  id: `movie-${i + 1}`,
  title: `Abstract Dimension ${i + 1}`,
  posterUrl: `https://picsum.photos/seed/${i + 1}/400/600`,
}));

const mockTrending: Movie[] = Array.from({ length: 10 }, (_, i) => ({
  id: `trending-${i + 11}`,
  title: `Neon Future ${i + 1}`,
  posterUrl: `https://picsum.photos/seed/${i + 11}/400/600`,
}));

const initialPosts: Post[] = [
  {
    id: 'post-1',
    user: {
      username: 'indie_filmmaker',
      avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
      subscriptionPrice: 4.99,
      isSubscribed: false,
    },
    imageUrl: 'https://picsum.photos/seed/post1/600/700',
    caption: 'Behind the scenes of my new short film. Subscribers get to see the full version first!',
    likes: 1024,
    commentsCount: 88,
    isExclusive: true,
  },
  {
    id: 'post-2',
    user: {
      username: 'stunt_master_jane',
      avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
      subscriptionPrice: 9.99,
      isSubscribed: true,
    },
    imageUrl: 'https://picsum.photos/seed/post2/600/700',
    caption: 'Just nailed this car jump sequence. So much fun!',
    likes: 5230,
    commentsCount: 450,
    isExclusive: false,
  },
  {
    id: 'post-3',
    user: {
      username: 'stunt_master_jane',
      avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
      subscriptionPrice: 9.99,
      isSubscribed: true,
    },
    imageUrl: 'https://picsum.photos/seed/post3/600/700',
    caption: 'Here is an exclusive look at my training regimen for the next big blockbuster!',
    likes: 8100,
    commentsCount: 720,
    isExclusive: true,
  },
  {
    id: 'post-4',
    user: {
      username: 'vfx_wizard',
      avatarUrl: 'https://picsum.photos/seed/avatar4/100/100',
      subscriptionPrice: 7.99,
      isSubscribed: false,
    },
    imageUrl: 'https://picsum.photos/seed/post4/600/700',
    caption: 'Breaking down the CGI in the latest hero movie. Public post!',
    likes: 2345,
    commentsCount: 123,
    isExclusive: false,
  },
    {
    id: 'post-5',
    user: {
      username: 'indie_filmmaker',
      avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
      subscriptionPrice: 4.99,
      isSubscribed: false,
    },
    imageUrl: 'https://picsum.photos/seed/post5/600/700',
    caption: 'Another exclusive shot from my new project. You have to subscribe to see this!',
    likes: 1800,
    commentsCount: 150,
    isExclusive: true,
  },
];


const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleSubscribe = (username: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.user.username === username) {
          return {
            ...post,
            user: { ...post.user, isSubscribed: true },
          };
        }
        return post;
      })
    );
  };
  
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Header />
      <main>
        <Hero />
        <div className="py-4 md:py-8 space-y-12">
          <ContentCarousel title="New Releases" movies={mockMovies} />
          <ContentCarousel title="Trending Now" movies={mockTrending} />
          <AIPicks />
          <Feed posts={posts} onSubscribe={handleSubscribe} />
        </div>
      </main>
      <footer className="text-center py-8 text-gray-500 border-t border-gray-800">
        <p>InstaFlix &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;

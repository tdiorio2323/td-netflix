import React, { useState, useEffect } from 'react';

const NavItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
    {children}
  </a>
);

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 p-4 z-50 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black to-transparent'}`}>
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold text-red-600 tracking-wider uppercase">InstaFlix</h1>
        <nav className="hidden md:flex items-center space-x-4">
          <NavItem>Home</NavItem>
          <NavItem>TV Shows</NavItem>
          <NavItem>Movies</NavItem>
          <NavItem>New & Popular</NavItem>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <img src="https://picsum.photos/seed/user-avatar/40/40" alt="User Avatar" className="w-8 h-8 rounded" />
      </div>
    </header>
  );
};
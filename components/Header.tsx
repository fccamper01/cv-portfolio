import React from 'react';

interface HeaderProps {
  name: string;
  tagline?: string;
}

const Header: React.FC<HeaderProps> = ({ name, tagline }) => {
  return (
    <header className="py-8 md:py-10 px-4 sm:px-6 lg:px-8 border-b border-neutral-300">
      <h1 className="text-3xl sm:text-4xl font-semibold text-black">{name}</h1>
      {/* Tagline display remains removed */}
    </header>
  );
};

export default Header;
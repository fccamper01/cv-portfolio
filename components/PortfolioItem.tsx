import React from 'react';
import { ArrowLeftIcon } from './Icons';

interface PortfolioItemProps {
  title: string;
  subtitle: string;
  url: string;
  isExternal?: boolean;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ title, subtitle, url, isExternal }) => {
  return (
    <a
      href={url}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : ''}
      className="group flex items-start p-4 border border-neutral-200 rounded-lg transition-all duration-150 ease-in-out hover:bg-neutral-50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      aria-label={`${title}, ${subtitle}`}
    >
      <ArrowLeftIcon className="w-4 h-4 mr-3 mt-[0.2rem] sm:mt-[0.25rem] text-neutral-400 opacity-0 group-hover:opacity-100 group-hover:text-black transition-all duration-150 shrink-0" />
      <div className="flex-1">
        <h2 className="text-lg sm:text-xl font-semibold text-black group-hover:text-black transition-colors duration-150">
          {title}
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          {subtitle}
        </p>
      </div>
    </a>
  );
};

export default PortfolioItem;
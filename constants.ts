import { PortfolioItemData, SocialLink } from './types';
import { GitHubIcon, LinkedInIcon, EmailIcon, TwitterIcon } from './components/Icons';
import React from 'react';

export const USER_NAME = "Alona Ponomarenko";
export const USER_TAGLINE = "Product Owner"; // Used in Header
export const USER_ROLE = "Product Owner"; // Used in HeroSection
export const USER_SUB_TAGLINE = "Translating Ideas into Experiences. One Sprint at a Time."; // Updated tagline for HeroSection

export const PORTFOLIO_ITEMS: PortfolioItemData[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform Reimagined',
    subtitle: 'Next.js, Tailwind CSS, Stripe Integration - 2024',
    url: '#', 
    isExternal: true,
  },
  {
    id: 'project-2',
    title: 'Interactive Data Visualization Tool',
    subtitle: 'React, D3.js, FastAPI - 2023',
    url: '#', 
    isExternal: true,
  },
  {
    id: 'article-1',
    title: 'The Future of Serverless Architectures',
    subtitle: 'Blog Post - Medium - 2023',
    url: '#', 
    isExternal: true,
  },
  {
    id: 'project-3',
    title: 'Open Source UI Component Library',
    subtitle: 'TypeScript, Storybook - Ongoing',
    url: '#', 
    isExternal: true,
  },
  {
    id: 'case-study-1',
    title: 'UX Redesign for a Mobile App',
    subtitle: 'Figma, User Research - 2022',
    url: '#', 
    isExternal: true,
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/yourusername', 
    icon: React.createElement(GitHubIcon, { className: "w-5 h-5" }),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername', 
    icon: React.createElement(LinkedInIcon, { className: "w-5 h-5" }),
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    url: 'https://twitter.com/yourusername', 
    icon: React.createElement(TwitterIcon, { className: "w-5 h-5" }),
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:youremail@example.com', 
    icon: React.createElement(EmailIcon, { className: "w-5 h-5" }),
  },
];
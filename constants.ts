
import { IconProps } from './types'; // Keep IconProps if other icon types might need it
import { GitHubIcon, LinkedInIcon, EmailIcon, MapPinIcon, PhoneIcon } from './components/Icons'; // Added MapPinIcon, PhoneIcon, removed TwitterIcon
import React from 'react';
import { PortfolioItemData, SocialLink } from './types';


export const USER_NAME = "Alona Ponomarenko";
export const USER_TAGLINE = "Product Owner"; // Used in Header (if Header component were used)
export const USER_ROLE = "Product Owner"; // Used in HeroSection
export const USER_SUB_TAGLINE = "Translating Ideas into Experiences. One Sprint at a Time."; // Updated tagline for HeroSection

// CV Based Contact Information
export const USER_EMAIL = "fccamper01@gmail.com";
export const USER_PHONE = "+38 884 953 619";
export const USER_LOCATION = "Poznań, Poland";
export const USER_LINKEDIN_URL = "https://www.linkedin.com/in/alona-ponomarenko-123286113/";
export const USER_GITHUB_URL_PRIMARY = "https://github.com/fccamper01";
export const USER_GITHUB_URL_SECONDARY = "https://github.com/alonka01";


// Export empty arrays to satisfy PortfolioSection.tsx imports
export const PORTFOLIO_ITEMS: PortfolioItemData[] = [];
export const SOCIAL_LINKS: SocialLink[] = [];

export const CONTACT_DETAILS = [
  {
    id: 'location',
    label: 'Location',
    value: USER_LOCATION,
    icon: React.createElement(MapPinIcon, { className: "w-5 h-5 mr-3 shrink-0" }),
    url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER_LOCATION)}`
  },
  {
    id: 'email',
    label: 'Email',
    value: USER_EMAIL,
    icon: React.createElement(EmailIcon, { className: "w-5 h-5 mr-3 shrink-0" }),
    url: `mailto:${USER_EMAIL}`
  },
  {
    id: 'phone',
    label: 'Phone',
    value: USER_PHONE,
    icon: React.createElement(PhoneIcon, { className: "w-5 h-5 mr-3 shrink-0" }),
    url: `tel:${USER_PHONE.replace(/\s/g, '')}`
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: "linkedin.com/in/alona-ponomarenko", // Shorter display value
    icon: React.createElement(LinkedInIcon, { className: "w-5 h-5 mr-3 shrink-0" }),
    url: USER_LINKEDIN_URL
  },
  {
    id: 'github1',
    label: 'GitHub (fccamper01)',
    value: "github.com/fccamper01",
    icon: React.createElement(GitHubIcon, { className: "w-5 h-5 mr-3 shrink-0" }),
    url: USER_GITHUB_URL_PRIMARY
  },
  {
    id: 'github2',
    label: 'GitHub (alonka01)',
    value: "github.com/alonka01",
    icon: React.createElement(GitHubIcon, { className: "w-5 h-5 mr-3 shrink-0" }),
    url: USER_GITHUB_URL_SECONDARY
  }
];

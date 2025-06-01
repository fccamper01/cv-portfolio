import React from 'react';
import { SocialLink } from '../types';
// USER_NAME is already imported in the original file if needed for copyright.

interface FooterProps {
  socialLinks: SocialLink[];
  userName: string;
}

const Footer: React.FC<FooterProps> = ({ socialLinks, userName }) => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-neutral-300">
      {/* Container div from original footer removed as padding is handled by this component now */}
      <ul className="flex flex-wrap justify-start gap-x-4 gap-y-2">
        {socialLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-black transition-colors duration-200 focus:outline-none focus-visible:text-black focus-visible:underline"
              aria-label={link.name}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-left text-xs text-neutral-500 mt-6">
        &copy; {new Date().getFullYear()} {userName}.
      </p>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from './Icons'; // Import new icons

interface SectionConfigForNav {
  id: string;
  title: string;
}

interface NavigationBarProps {
  sections: SectionConfigForNav[];
  currentSectionIndex: number;
  onNavigate: (index: number, initiatedBy?: 'user' | 'program') => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ sections, currentSectionIndex, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Effect to lock/unlock body scroll when mobile menu opens/closes
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup function to reset body overflow when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMobileLinkClick = (index: number) => {
    onNavigate(index, 'program');
    setIsMobileMenuOpen(false); // Close menu after navigation
  };

  return (
    <>
      <nav 
        className="main-nav justify-end md:justify-center" /* Responsive justify: hamburger right, desktop links center */
        aria-label="Main navigation"
      >
        {/* Desktop Navigation */}
        <ul className="main-nav-desktop-ul hidden md:flex items-center"> {/* Tailwind for responsive visibility, specific class for styling */}
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => onNavigate(index, 'program')}
                className={index === currentSectionIndex ? 'active' : ''}
                aria-current={index === currentSectionIndex ? 'page' : undefined}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          className="block md:hidden mobile-menu-button" /* Explicit 'block', hidden on md+ */
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu-overlay"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu-overlay" 
          className="mobile-menu-overlay"
          role="dialog"
          aria-modal="true"
        >
          <div className="mobile-menu-header">
             <button
                className="mobile-menu-close-button"
                onClick={toggleMobileMenu}
                aria-label="Close navigation menu"
              >
                <XIcon className="h-7 w-7" />
            </button>
          </div>
          <ul>
            {sections.map((section, index) => (
              <li key={`mobile-${section.id}`}>
                <button
                  onClick={() => handleMobileLinkClick(index)}
                  className={index === currentSectionIndex ? 'active' : ''}
                  aria-current={index === currentSectionIndex ? 'page' : undefined}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
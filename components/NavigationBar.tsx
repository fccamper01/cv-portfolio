import React from 'react';

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
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul>
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
    </nav>
  );
};

export default NavigationBar;
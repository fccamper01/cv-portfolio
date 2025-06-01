
import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import NavigationBar from './components/NavigationBar'; // Added
import { ChevronUpIcon } from './components/Icons';

// Define a type for section configuration
interface SectionConfig {
  id: string;
  title: string; // For menu display
  bgColorClass: string;
  textColorClass?: string;
}

// Central configuration for all sections
const SECTIONS_CONFIG: SectionConfig[] = [
  { id: 'hero', title: 'Home', bgColorClass: 'bg-[#E8EFF5]', textColorClass: 'text-indigo-700' }, // Hero has its own styling, bgColorClass is for consistency if needed
  { id: 'section2', title: 'Services', bgColorClass: 'bg-teal-700', textColorClass: 'text-white' },
  { id: 'section3', title: 'About', bgColorClass: 'bg-slate-700', textColorClass: 'text-white' },
  { id: 'section4', title: 'Portfolio', bgColorClass: 'bg-sky-700', textColorClass: 'text-white' },
  { id: 'section5', title: 'Blog', bgColorClass: 'bg-indigo-700', textColorClass: 'text-white' },
  { id: 'section6', title: 'Contact', bgColorClass: 'bg-neutral-800', textColorClass: 'text-white' },
];

const SECTION_IDS = SECTIONS_CONFIG.map(s => s.id);
const SCROLL_SETTLE_DURATION = 700; // ms, estimate for scrollIntoView animation

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); 
    return () => clearTimeout(timer);
  }, []);

  const navigateToSection = useCallback((index: number, initiatedBy: 'user' | 'program' = 'program') => {
    if (index >= 0 && index < SECTION_IDS.length) {
      const sectionId = SECTION_IDS[index];
      const sectionElement = document.getElementById(sectionId);
      
      if (sectionElement) {
        if (initiatedBy === 'program') {
          isProgrammaticScrollRef.current = true;
        }
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setCurrentSectionIndex(index); 

        if (initiatedBy === 'program') {
          setTimeout(() => {
            isProgrammaticScrollRef.current = false;
          }, SCROLL_SETTLE_DURATION + 100); 
        }
      }
    }
  }, []);
  
  useEffect(() => {
    sectionRefs.current = SECTION_IDS.map(id => document.getElementById(id));

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return;

        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        
        if (intersectingEntry) {
          const visibleSectionId = intersectingEntry.target.id;
          const visibleSectionIndex = SECTION_IDS.indexOf(visibleSectionId);
          if (visibleSectionIndex !== -1 && visibleSectionIndex !== currentSectionIndex) {
            setCurrentSectionIndex(visibleSectionIndex);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px', // Adjust if nav bar is transparent and content should trigger "active" sooner
        threshold: 0.5, 
      }
    );

    sectionRefs.current.forEach(section => {
      if (section) observerRef.current?.observe(section);
    });

    if (!isLoading && sectionRefs.current[0] && sectionRefs.current[0]?.getBoundingClientRect().top === 0) {
        if (currentSectionIndex !== 0) setCurrentSectionIndex(0);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isLoading, currentSectionIndex]);

  useEffect(() => {
    if (!isLoading) {
      const heroElement = document.getElementById(SECTION_IDS[0]);
      if (heroElement && heroElement.getBoundingClientRect().top !== 0 && currentSectionIndex === 0) {
        setTimeout(() => {
            if (!isProgrammaticScrollRef.current && document.getElementById(SECTION_IDS[0])?.getBoundingClientRect().top !== 0) {
                 navigateToSection(0, 'program');
            }
        }, 100);
      }
    }
  }, [isLoading, navigateToSection, currentSectionIndex]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const PlaceholderSection: React.FC<SectionConfig> = ({ id, title, bgColorClass, textColorClass = "text-white"}) => (
    <section id={id} className={`h-screen w-full flex flex-col items-center justify-center ${bgColorClass} ${textColorClass} p-8 outline-none snap-start`} tabIndex={-1} aria-label={title}>
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-lg text-center">Content for {title.toLowerCase()} will go here.</p>
    </section>
  );

  return (
    <div className="animate-screen-fade-in">
      <NavigationBar 
        sections={SECTIONS_CONFIG} 
        currentSectionIndex={currentSectionIndex} 
        onNavigate={navigateToSection} 
      />
      <HeroSection /> 
      {SECTIONS_CONFIG.slice(1).map(section => ( // Render placeholder sections starting from index 1
        <PlaceholderSection
          key={section.id}
          id={section.id}
          title={section.title}
          bgColorClass={section.bgColorClass}
          textColorClass={section.textColorClass}
        />
      ))}

      <button
        onClick={() => navigateToSection(0, 'program')}
        className={`scroll-to-top-button ${currentSectionIndex > 0 ? 'visible' : ''}`}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <ChevronUpIcon />
      </button>
    </div>
  );
};

export default App;
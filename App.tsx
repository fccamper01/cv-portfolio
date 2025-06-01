
import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import NavigationBar from './components/NavigationBar'; 
import SharedBackground from './components/SharedBackground'; // Added
import { ChevronUpIcon } from './components/Icons';

interface SectionConfig {
  id: string;
  title: string; 
  baseBgColorClass: string; // Base color for the section
  contentTextColorClass?: string; // Text color for the main content
  // Props for SharedBackground customization if needed per section
  sharedBgSnippetColor?: string;
  sharedBgPanel1Color?: string;
  sharedBgPanel2Color?: string;
}

const SECTIONS_CONFIG: SectionConfig[] = [
  { 
    id: 'hero', 
    title: 'Home', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-sky-600', // Hero specific text colors are handled within HeroSection mostly
    sharedBgSnippetColor: '#374151' // gray-700 for hero's darker snippets
  },
  { 
    id: 'section2', 
    title: 'Services', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-teal-700', // Updated for contrast
    sharedBgSnippetColor: 'text-teal-700/40'
  },
  { 
    id: 'section3', 
    title: 'About', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-slate-700', // Updated for contrast
    sharedBgSnippetColor: 'text-slate-700/40'
  },
  { 
    id: 'section4', 
    title: 'Portfolio', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-sky-700', // Updated for contrast
    sharedBgSnippetColor: 'text-sky-700/40'
  },
  { 
    id: 'section5', 
    title: 'Blog', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-sky-600', // Updated for contrast
    sharedBgSnippetColor: 'text-sky-600/40'
  },
  { 
    id: 'section6', 
    title: 'Contact', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-neutral-700', // Updated for contrast
    sharedBgSnippetColor: 'text-neutral-700/40'
  },
];

const SECTION_IDS = SECTIONS_CONFIG.map(s => s.id);
const SCROLL_SETTLE_DURATION = 1000;
const NAV_BAR_HEIGHT = 64;

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
        setCurrentSectionIndex(index); 
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        if (initiatedBy === 'program') {
          setTimeout(() => {
            isProgrammaticScrollRef.current = false;
          }, SCROLL_SETTLE_DURATION + 100); 
        }
      }
    }
  }, [setCurrentSectionIndex]);
  
  useEffect(() => {
    if (isLoading) return; 

    sectionRefs.current = SECTION_IDS.map(id => document.getElementById(id));

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) return;

        const intersectingEntries = entries.filter(entry => entry.isIntersecting);
        
        if (intersectingEntries.length > 0) {
          intersectingEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const topVisibleEntry = intersectingEntries[0];
          
          if (topVisibleEntry) {
            const visibleSectionId = topVisibleEntry.target.id;
            const visibleSectionIndex = SECTION_IDS.indexOf(visibleSectionId);
            
            setCurrentSectionIndex(prevCurrentSectionIndex => {
              if (visibleSectionIndex !== -1 && visibleSectionIndex !== prevCurrentSectionIndex) {
                return visibleSectionIndex;
              }
              return prevCurrentSectionIndex;
            });
          }
        }
      },
      {
        root: null,
        rootMargin: `-${NAV_BAR_HEIGHT - 1}px 0px -20% 0px`, 
        threshold: 0.01, 
      }
    );

    sectionRefs.current.forEach(section => {
      if (section) observerRef.current?.observe(section);
    });

    const firstVisibleSection = sectionRefs.current.find(sec => {
        if (!sec) return false;
        const rect = sec.getBoundingClientRect();
        return rect.top <= NAV_BAR_HEIGHT && rect.bottom > NAV_BAR_HEIGHT;
    });
    if(firstVisibleSection){
        const initialIndex = SECTION_IDS.indexOf(firstVisibleSection.id);
        if(initialIndex !== -1 && initialIndex !== currentSectionIndex) {
            setCurrentSectionIndex(initialIndex);
        }
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isLoading]); 

  if (isLoading) {
    return <LoadingScreen />;
  }

  const PlaceholderSection: React.FC<SectionConfig> = ({ 
      id, 
      title, 
      baseBgColorClass, 
      contentTextColorClass = "text-slate-700", // Default dark text
      sharedBgSnippetColor,
      sharedBgPanel1Color,
      sharedBgPanel2Color 
    }) => (
    <section 
      id={id} 
      className={`relative h-screen w-full flex flex-col items-center justify-center ${baseBgColorClass} p-8 outline-none snap-start overflow-hidden`} 
      tabIndex={-1} 
      aria-label={title}
    >
      <SharedBackground 
        snippetColor={sharedBgSnippetColor}
        panel1Color={sharedBgPanel1Color}
        panel2Color={sharedBgPanel2Color}
      />
      <div className={`relative z-10 text-center ${contentTextColorClass}`}>
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg">Content for {title.toLowerCase()} will go here.</p>
      </div>
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
      {SECTIONS_CONFIG.slice(1).map(section => (
        <PlaceholderSection
          key={section.id}
          id={section.id}
          title={section.title}
          baseBgColorClass={section.baseBgColorClass}
          contentTextColorClass={section.contentTextColorClass}
          sharedBgSnippetColor={section.sharedBgSnippetColor}
          sharedBgPanel1Color={section.sharedBgPanel1Color}
          sharedBgPanel2Color={section.sharedBgPanel2Color}
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
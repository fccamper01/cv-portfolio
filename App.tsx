
import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import NavigationBar from './components/NavigationBar'; 
import SharedBackground from './components/SharedBackground';
import { ChevronUpIcon } from './components/Icons';
import { CONTACT_DETAILS } from './constants';

interface SectionConfig {
  id: string;
  title: string; 
  baseBgColorClass: string; 
  contentTextColorClass?: string; 
  content: React.ReactNode; // To hold the rich JSX content
  sharedBgSnippetColor?: string;
  sharedBgPanel1Color?: string;
  sharedBgPanel2Color?: string;
}

// CV Content - Styled with Tailwind
const summaryContent = (
  <div className="max-w-3xl mx-auto text-left sm:text-center">
    <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
      Dynamic and results-oriented Product Owner with a strong technical foundation as a Front-End Developer. 
      Proven ability to bridge the gap between technical teams and business objectives, translating complex 
      requirements into user-centric digital experiences. Eager to leverage 3+ years of hands-on development 
      with React, TypeScript, and Next.js alongside product management skills to drive innovation and 
      deliver impactful solutions.
    </p>
  </div>
);

const skillsContent = (
  <div className="max-w-4xl mx-auto text-left grid md:grid-cols-2 gap-x-8 gap-y-6">
    <div>
      <h3 className="text-2xl font-semibold mb-3">Product Ownership</h3>
      <ul className="list-disc list-inside space-y-1 text-lg">
        <li>Agile Methodologies & Scrum</li>
        <li>User Story Mapping & Roadmapping</li>
        <li>Stakeholder Management</li>
        <li>UX/UI Principles</li>
        <li>Market Research & A/B Testing</li>
      </ul>
    </div>
    <div>
      <h3 className="text-2xl font-semibold mb-3">Technical Skills</h3>
      <ul className="list-disc list-inside space-y-1 text-lg">
        <li>HTML5, CSS, JavaScript, TypeScript</li>
        <li>React, Next.js (3+ years Front-End Development)</li>
        <li>Git, Github, Figma</li>
        <li>Adobe Campaign, Adobe Experience Manager (AEM)</li>
        <li>Tealium iQ, Cookie Management</li>
      </ul>
    </div>
    <div className="md:col-span-2">
      <h3 className="text-2xl font-semibold mb-3 mt-4">Languages</h3>
      <ul className="list-disc list-inside space-y-1 text-lg">
        <li>English (Fluent)</li>
        <li>Spanish (Fluent)</li>
        <li>Ukrainian (Native)</li>
        <li>Polish (Fluent)</li>
      </ul>
    </div>
  </div>
);

const experienceContent = (
  <div className="max-w-3xl mx-auto text-left space-y-8">
    <div>
      <h3 className="text-2xl font-semibold">Front-end Developer</h3>
      <p className="text-lg font-medium text-sky-600">GlaxoSmithKline</p>
      <p className="text-md text-slate-500 mb-2">JUL 2021 - PRESENT</p>
      <ul className="list-disc list-inside space-y-1 text-lg">
        <li>Developed and maintained user interfaces for web applications using React, TypeScript, and Next.js.</li>
        <li>Collaborated with UI/UX designers and back-end developers to implement new features.</li>
        <li>Ensured code quality, performance, and responsiveness of applications.</li>
        <li>Participated in Agile/Scrum ceremonies, contributing to sprint planning and reviews.</li>
      </ul>
    </div>
    <div>
      <h3 className="text-2xl font-semibold">Tech Consultant/Tech Engineer</h3>
      <p className="text-lg font-medium text-sky-600">GlaxoSmithKline</p>
      <p className="text-md text-slate-500 mb-2">JUL 2017 - JUL 2021</p>
      <ul className="list-disc list-inside space-y-1 text-lg">
        <li>Development and maintenance tasks in Adobe Campaign.</li>
        <li>Cookie management and third-party tags implementation.</li>
        <li>Content management in AEM.</li>
        <li>Tealium iQ.</li>
      </ul>
    </div>
    <div>
      <h3 className="text-2xl font-semibold">IT Analyst</h3>
      <p className="text-lg font-medium text-sky-600">CenturyLink</p>
      <p className="text-md text-slate-500 mb-2">AUG 2015 - JUL 2017</p>
      <ul className="list-disc list-inside space-y-1 text-lg">
        <li>Email and phone support in English and Spanish.</li>
        <li>Active Directory Administration (Creation/Modification/Removal of users' accounts and rights).</li>
        <li>O365/Exchange: Creation of mailboxes, migration, assignment of licenses, settings configuration.</li>
        <li>Basic troubleshooting, escalation of high-priority incidents.</li>
        <li>Remoting to user's PC to troubleshoot and resolve issues.</li>
        <li>Doing backups of mailboxes and setting up email forwarding.</li>
        <li>Ticket management in various systems: Remedy, Service Now, Sysaid.</li>
        <li>Troubleshooting of mobile devices (iPads, iPhones, smartphones).</li>
      </ul>
    </div>
  </div>
);

const educationContent = (
  <div className="max-w-3xl mx-auto text-left space-y-6">
    <div>
      <h3 className="text-2xl font-semibold">Loftschool</h3>
      <p className="text-lg font-medium text-sky-600">FULLSTACK DEVELOPMENT</p>
      <p className="text-md text-slate-500">2021 - PRESENT</p>
    </div>
    <div>
      <h3 className="text-2xl font-semibold">Treehouse, FreeCodeCamp</h3>
      <p className="text-lg font-medium text-sky-600">FRONTEND CURRICULUM</p>
      <p className="text-md text-slate-500">2019 - PRESENT</p>
    </div>
    <div>
      <h3 className="text-2xl font-semibold">DUEP University (Ukraine)</h3>
      <p className="text-lg font-medium text-sky-600">MASTER OF ARTS IN SPANISH AND ENGLISH LANGUAGES</p>
      <p className="text-md text-slate-500">2007 - 2012</p>
    </div>
  </div>
);

const contactContent = (
  <div className="max-w-md mx-auto text-left space-y-4">
    {CONTACT_DETAILS.map(detail => (
      <a 
        key={detail.id} 
        href={detail.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center p-3 rounded-lg transition-colors hover:bg-sky-500/10 group"
        aria-label={`${detail.label}: ${detail.value}`}
      >
        {detail.icon}
        <span className="text-lg group-hover:text-sky-600">{detail.value}</span>
      </a>
    ))}
  </div>
);


const SECTIONS_CONFIG: SectionConfig[] = [
  { 
    id: 'hero', 
    title: 'Home', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-sky-700', // Hero specific text colors are handled within HeroSection mostly
    content: null, // HeroSection is rendered separately
    sharedBgSnippetColor: '#374151' 
  },
  { 
    id: 'summary', 
    title: 'Summary', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-slate-800', 
    content: summaryContent,
    sharedBgSnippetColor: 'text-slate-700/40'
  },
  { 
    id: 'skills', 
    title: 'Skills', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-slate-800', 
    content: skillsContent,
    sharedBgSnippetColor: 'text-slate-700/40'
  },
  { 
    id: 'experience', 
    title: 'Experience', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-slate-800', 
    content: experienceContent,
    sharedBgSnippetColor: 'text-sky-700/40'
  },
  { 
    id: 'education', 
    title: 'Education', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-slate-800',
    content: educationContent,
    sharedBgSnippetColor: 'text-sky-600/40'
  },
  { 
    id: 'contact', 
    title: 'Contact', 
    baseBgColorClass: 'bg-[#E8EFF5]', 
    contentTextColorClass: 'text-slate-800', 
    content: contactContent,
    sharedBgSnippetColor: 'text-neutral-700/40'
  },
];

const SECTION_IDS = SECTIONS_CONFIG.map(s => s.id);
const SCROLL_SETTLE_DURATION = 1200; 
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
          }, SCROLL_SETTLE_DURATION); 
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
          const topVisibleEntry = intersectingEntries.reduce((prev, curr) => {
            const prevTop = prev.boundingClientRect.top;
            const currTop = curr.boundingClientRect.top;
            if (prevTop >= NAV_BAR_HEIGHT && currTop >= NAV_BAR_HEIGHT) {
              return prevTop < currTop ? prev : curr;
            }
            if (currTop >= NAV_BAR_HEIGHT) return curr; 
            if (prevTop >= NAV_BAR_HEIGHT) return prev; 
            return prev.intersectionRatio > curr.intersectionRatio ? prev : curr; 
          });
          
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
        rootMargin: `-${NAV_BAR_HEIGHT}px 0px -40% 0px`, 
        threshold: 0.01, 
      }
    );

    sectionRefs.current.forEach(section => {
      if (section) observerRef.current?.observe(section);
    });
    
    setTimeout(() => {
        if(isProgrammaticScrollRef.current) return; 
        const firstVisibleSection = sectionRefs.current.find(sec => {
            if (!sec) return false;
            const rect = sec.getBoundingClientRect();
            return rect.top < window.innerHeight - (window.innerHeight * 0.4) && rect.bottom > NAV_BAR_HEIGHT + (window.innerHeight * 0.1);
        });
        if(firstVisibleSection){
            const initialIndex = SECTION_IDS.indexOf(firstVisibleSection.id);
            if(initialIndex !== -1 && initialIndex !== currentSectionIndex) {
                setCurrentSectionIndex(initialIndex);
            } else if (initialIndex === -1 && currentSectionIndex !== 0) {
                // Fallback handled by initial state if no specific section matches
            }
        } else if (currentSectionIndex !== 0) {
            // Fallback handled by initial state
        }
    }, SCROLL_SETTLE_DURATION + 200);


    return () => {
      observerRef.current?.disconnect();
    };
  }, [isLoading, currentSectionIndex, navigateToSection]); 

  if (isLoading) {
    return <LoadingScreen />;
  }

  const PlaceholderSection: React.FC<SectionConfig> = ({ 
      id, 
      title, 
      baseBgColorClass, 
      contentTextColorClass = "text-slate-700",
      content, 
      sharedBgSnippetColor,
      sharedBgPanel1Color,
      sharedBgPanel2Color 
    }) => (
    <section 
      id={id} 
      className={`relative min-h-screen w-full flex flex-col items-center justify-center ${baseBgColorClass} py-16 px-4 sm:px-6 lg:px-8 outline-none snap-start overflow-hidden`} 
      tabIndex={-1} 
      aria-labelledby={`${id}-title`}
    >
      <SharedBackground 
        snippetColor={sharedBgSnippetColor}
        panel1Color={sharedBgPanel1Color}
        panel2Color={sharedBgPanel2Color}
      />
      <div className={`relative z-10 w-full ${contentTextColorClass}`}>
        <h2 id={`${id}-title`} className="text-4xl sm:text-5xl font-bold mb-10 sm:mb-12 text-center">{title}</h2>
        {content}
      </div>
      {/* Scroll down button removed */}
    </section>
  );

  return (
    <>
      <NavigationBar 
        sections={SECTIONS_CONFIG} // Pass all sections, including 'hero'
        currentSectionIndex={currentSectionIndex} // Pass the direct current index
        onNavigate={(navIndex) => navigateToSection(navIndex, 'program')} // Navigate using direct index
      />
      <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
        <HeroSection />
        {SECTIONS_CONFIG.filter(section => section.id !== 'hero').map((section) => (
            <PlaceholderSection 
              key={section.id} 
              {...section} 
            />
        ))}
      </main>
       {/* Scroll to Top Button */}
       {currentSectionIndex > 0 && ( 
        <button
          onClick={() => navigateToSection(0, 'program')}
          className="fixed bottom-6 right-6 z-30 p-3 bg-sky-600/80 hover:bg-sky-500 text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400" // Changed rounded-full to rounded-lg
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default App;

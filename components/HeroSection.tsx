import React, { useEffect, useState, useCallback } from 'react';
import DeviceAnalyticsAnimation from './DeviceAnalyticsAnimation';
import TypingText from './TypingText';
import BlueprintLines from './BlueprintLines'; 
import SharedBackground from './SharedBackground'; // Added
import { USER_NAME, USER_ROLE, USER_SUB_TAGLINE } from '../constants';

const HeroSection: React.FC = () => {
  const [areHudElementsVisible, setAreHudElementsVisible] = useState(false);
  const [isRoleVisible, setIsRoleVisible] = useState(false); 
  
  useEffect(() => {
    const hudTimer = setTimeout(() => {
      setAreHudElementsVisible(true);
    }, 500);

    const roleTimer = setTimeout(() => {
      setIsRoleVisible(true);
    }, 800); 

    return () => {
      clearTimeout(hudTimer);
      clearTimeout(roleTimer);
    };
  }, []);

  const hudTextStyle = "transition-all-500-ease-out";
  const nameStyle: React.CSSProperties = {
    color: 'var(--hero-glow-color-primary)',
    textShadow: `
       0 0 6px var(--hero-glow-color-secondary), 
       0 0 10px var(--hero-glow-color-secondary), 
       0 0 15px var(--hero-glow-color-secondary),
       0 0 25px var(--hero-glow-color-secondary),
       0 0 2px #fff, 0 0 4px #fff`
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#E8EFF5] text-white snap-start"
      aria-labelledby="hero-main-title"
    >
      <SharedBackground 
        snippetColor="#374151" // Example: Tailwind gray-700
        snippetOpacity={0.05}
      />

      <BlueprintLines isActive={isRoleVisible} />
      
      {/* Central Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 
                     w-48 h-48 sm:w-64 sm:h-64 
                     landscape:w-36 landscape:h-36 
                     sm:landscape:w-44 sm:landscape:h-44"> {/* Further reduced size for landscape */}
        <DeviceAnalyticsAnimation />
      </div>

      {/* Main Text block */}
      <div className="absolute bottom-10 sm:bottom-12 md:bottom-16 
                     landscape:bottom-4 sm:landscape:bottom-6 md:landscape:bottom-8 
                     left-0 right-0 z-10 flex flex-col items-center text-center px-2 sm:px-4">
        <h1 
          id="hero-main-title"
          className="text-3xl sm:text-4xl md:text-5xl 
                     landscape:text-2xl sm:landscape:text-3xl md:landscape:text-4xl 
                     font-extrabold uppercase tracking-tight min-h-[1.2em]"
          style={nameStyle}
        >
          {USER_NAME}
        </h1>
        <p 
          className={`mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl 
                      landscape:text-base sm:landscape:text-lg md:landscape:text-xl 
                      font-medium text-sky-600/90 uppercase tracking-wider transition-all-500-ease-out ${isRoleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          {USER_ROLE}
        </p>
        <TypingText
          textToType={USER_SUB_TAGLINE}
          typingSpeedMs={60}
          startCondition={isRoleVisible}
          className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base 
                     landscape:text-[10px] sm:landscape:text-xs md:landscape:text-sm 
                     font-normal text-sky-500/80 tracking-wide min-h-[1.2em] sm:min-h-[1.5em] 
                     px-1 landscape:px-0" // Added padding adjustment
          style={{ textShadow: '0 0 3px rgba(255,255,255,0.3)'}}
        />
      </div>

      {/* Small HUD text elements */}
      <div className={`absolute top-4 sm:top-6 left-4 sm:left-6 z-20 text-[10px] sm:text-xs font-mono text-sky-500/70 ${areHudElementsVisible ? 'opacity-75' : 'opacity-0'} 
                      landscape:top-2 landscape:left-2 landscape:text-[9px] sm:landscape:text-[10px]`}>
        <p className={`${hudTextStyle} ${areHudElementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{transitionDelay: areHudElementsVisible ? '0.1s' : '0s'}}>CONN_STATUS: SECURE</p>
        <p className={`${hudTextStyle} ${areHudElementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{transitionDelay: areHudElementsVisible ? '0.2s' : '0s'}}>GRID_REF: 7B3A.01</p>
      </div>
      
      <div className={`absolute top-4 sm:top-6 right-4 sm:right-6 z-20 text-[10px] sm:text-xs font-mono text-sky-500/70 ${areHudElementsVisible ? 'opacity-75' : 'opacity-0'}
                      landscape:top-2 landscape:right-2 landscape:text-[9px] sm:landscape:text-[10px]`}>
        <p className={`${hudTextStyle} ${areHudElementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{transitionDelay: areHudElementsVisible ? '0.3s' : '0s'}}>NODE_ID: AP-PO-2024</p>
        <p className={`${hudTextStyle} ${areHudElementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{transitionDelay: areHudElementsVisible ? '0.4s' : '0s'}}>OP_MODE: ACTIVE</p>
      </div>
    </section>
  );
};

export default HeroSection;
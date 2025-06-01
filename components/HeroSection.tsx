
import React, { useEffect, useState, useCallback } from 'react';
import DeviceAnalyticsAnimation from './DeviceAnalyticsAnimation';
import TypingText from './TypingText';
import BlueprintLines from './BlueprintLines';
import SharedBackground from './SharedBackground';
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

  const nameParts = USER_NAME.split(' ');
  const firstName = nameParts.length > 0 ? nameParts[0] : '';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';


  return (
    <section
      id="hero"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#E8EFF5] text-white snap-start"
      aria-labelledby="hero-main-title"
    >
      <SharedBackground
        snippetColor="#374151"
        snippetOpacity={0.05}
        animateLines={true}         // Enable line animations
        animationDelayBase={0.3}    // Start after a brief delay
        animationDuration={1.2}     // Set animation speed
      />

      <BlueprintLines isActive={isRoleVisible} />

      {/* Wrapper for main content */}
      <div className="relative z-10 flex flex-col items-center text-center p-4 md:py-10
                     gap-y-8 {/* Adjusted gap to match loading screen's mt-8 */}
                     landscape:gap-y-6 {/* Adjusted landscape gap */}">
        {/* Central Animation */}
        <div className="w-160 h-160">
          <DeviceAnalyticsAnimation />
        </div>

        {/* Main Text block */}
        <div className="z-10 flex flex-col items-center text-center px-2 sm:px-4">
          <h1
            id="hero-main-title"
            className="text-2xl sm:text-3xl md:text-3xl
                       landscape:text-xl sm:landscape:text-2xl md:landscape:text-2xl
                       uppercase tracking-wider
                       " // font-semibold and text-sky-700 removed, applied to spans
          >
            <span className="font-bold text-sky-800">{firstName}</span>
            {lastName && <span className="font-normal text-sky-600"> {lastName}</span>}
          </h1>
          <p
            className={`mt-2 text-sm sm:text-base md:text-base {/* Matched LoadingScreen Text 2 size & mt */}
                        landscape:text-xs sm:landscape:text-sm md:landscape:text-sm
                        font-medium text-sky-600 uppercase tracking-wide {/* Matched LoadingScreen Text 2 style */}
                        transition-all-500-ease-out ${isRoleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            {USER_ROLE}
          </p>
          <TypingText
            textToType={USER_SUB_TAGLINE}
            typingSpeedMs={60}
            startCondition={isRoleVisible}
            className="mt-1 text-xs sm:text-sm md:text-sm {/* Harmonized size with USER_ROLE */}
                       landscape:text-[9px] sm:landscape:text-[10px] md:landscape:text-[10px]
                       font-normal text-sky-600/80 tracking-wide {/* Harmonized style */}
                       px-1 landscape:px-0"
          />
        </div>
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
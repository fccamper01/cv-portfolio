import React, { useEffect, useState, useCallback } from 'react';
import LoadingSpinner from './LoadingSpinner';
import TypingText from './TypingText'; // Import the new TypingText component
import { USER_NAME, USER_ROLE, USER_SUB_TAGLINE } from '../constants';

const generateRandomHexChars = (length: number) => {
  let result = '';
  const characters = '0123456789ABCDEF';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    if ((i + 1) % 2 === 0 && i < length -1 ) result += ' ';
  }
  return result;
};

const generateCodeContent = () => Array.from({ length: Math.floor(3 + Math.random() * 4) }, () => generateRandomHexChars(Math.floor(8 + Math.random() * 20))).join('\n');

const HeroSection: React.FC = () => {
  const [codeSnippets, setCodeSnippets] = useState<Array<{id: number; style: React.CSSProperties; content: string}>>([]);
  const [areHudElementsVisible, setAreHudElementsVisible] = useState(false);
  const [isRoleVisible, setIsRoleVisible] = useState(false);
  // isNameAnimationComplete is no longer needed as name is static.
  
  useEffect(() => {
    const newSnippets = [];
    const numSnippets = 20; 
    for (let i = 0; i < numSnippets; i++) {
      newSnippets.push({
        id: i,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `translate(-${Math.random() * 50}%, -${Math.random() * 50}%) scale(${0.3 + Math.random() * 0.3})`,
          opacity: 0.04 + Math.random() * 0.05, 
          color: '#374151', // Tailwind gray-700
        },
        content: generateCodeContent()
      });
    }
    setCodeSnippets(newSnippets);

    // Trigger HUD animation shortly after mount
    const hudTimer = setTimeout(() => {
      setAreHudElementsVisible(true);
    }, 500);

    // Trigger Role animation after HUDs start
    const roleTimer = setTimeout(() => {
      setIsRoleVisible(true);
    }, 800); // Slightly after HUD elements start

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
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#E8EFF5] text-white"
      aria-labelledby="hero-main-title"
    >
      {/* Background geometric shapes */}
      <div className="absolute inset-0 opacity-80">
        <div className="absolute -top-1/4 -left-1/3 w-3/5 h-[160%] bg-white/10 transform -rotate-[30deg] origin-center rounded-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/3 w-3/5 h-[160%] bg-sky-500/5 transform rotate-[25deg] origin-center rounded-3xl"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-slate-400/20"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-slate-400/20"></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-slate-400/20"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-slate-400/20"></div>
      </div>

      {/* Pseudo-code snippets */}
      <div className="absolute inset-0 code-snippet-bg">
        {codeSnippets.map(snippet => (
          <pre key={snippet.id} className="code-block" style={snippet.style}>
            {snippet.content}
          </pre>
        ))}
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 mt-[-10vh]">
        <LoadingSpinner />
      </div>

      <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-0 right-0 z-10 flex flex-col items-center text-center px-4">
        <h1 
          id="hero-main-title"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight min-h-[1.2em] sm:min-h-[1.2em] md:min-h-[1.2em]"
          style={nameStyle}
        >
          {USER_NAME}
        </h1>
        <p 
          className={`mt-2 text-xl sm:text-2xl md:text-3xl font-medium text-indigo-700/90 uppercase tracking-wider transition-all-500-ease-out ${isRoleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
          {USER_ROLE}
        </p>
        <TypingText
          textToType={USER_SUB_TAGLINE}
          typingSpeedMs={60}
          startCondition={isRoleVisible} // Start typing when role is visible
          className="mt-3 text-sm sm:text-base md:text-lg font-normal text-indigo-600/80 tracking-wide min-h-[1.5em]" // Added min-h for layout stability
          style={{ textShadow: '0 0 3px rgba(255,255,255,0.3)'}}
        />
      </div>

      {/* Small HUD text elements */}
      <div className={`absolute top-8 left-8 z-10 text-xs font-mono text-indigo-600/70 opacity-75 ${areHudElementsVisible ? 'opacity-75' : 'opacity-0'}`}>
        <p className={`${hudTextStyle} ${areHudElementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{transitionDelay: areHudElementsVisible ? '0.1s' : '0s'}}>CONN_STATUS: SECURE</p>
        <p className={`${hudTextStyle} ${areHudElementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{transitionDelay: areHudElementsVisible ? '0.2s' : '0s'}}>GRID_REF: 7B3A.01</p>
      </div>
      <div className={`absolute bottom-8 right-8 z-10 text-xs font-mono text-indigo-600/70 opacity-75 text-right ${areHudElementsVisible ? 'opacity-75' : 'opacity-0'}`}>
        <p className={`${hudTextStyle} ${areHudElementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{transitionDelay: areHudElementsVisible ? '0.3s' : '0s'}}>NODE_ID: AP-PO-2024</p>
        <p className={`${hudTextStyle} ${areHudElementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{transitionDelay: areHudElementsVisible ? '0.4s' : '0s'}}>OP_MODE: ACTIVE</p>
      </div>
    </section>
  );
};

export default HeroSection;
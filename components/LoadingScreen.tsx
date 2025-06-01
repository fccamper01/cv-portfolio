import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const generateRandomHexChars = (length: number) => {
  let result = '';
  const characters = '0123456789ABCDEF';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    if ((i + 1) % 2 === 0 && i < length -1 ) result += ' ';
  }
  return result;
};

const LoadingScreen: React.FC = () => {
  const [codeSnippets, setCodeSnippets] = useState<Array<{id: number; style: React.CSSProperties; content: string}>>([]);
  
  useEffect(() => {
    const newSnippets = [];
    const numSnippets = 25; // Increased slightly for better coverage
    for (let i = 0; i < numSnippets; i++) {
      newSnippets.push({
        id: i,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `translate(-${Math.random() * 50}%, -${Math.random() * 50}%) scale(${0.4 + Math.random() * 0.4})`, // smaller scale
          opacity: 0.03 + Math.random() * 0.06, 
          color: '#2c5282', // Tailwind's blue-700, good on sky-100
        },
        content: Array.from({ length: Math.floor(2 + Math.random() * 5) }, () => generateRandomHexChars(Math.floor(6 + Math.random() * 18))).join('\n')
      });
    }
    setCodeSnippets(newSnippets);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-sky-100 text-slate-700 animate-screen-fade-in"
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      {/* Background geometric lines */}
      <div className="absolute inset-0 opacity-75">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-[150%] bg-sky-300/20 transform -rotate-45 origin-center"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-[150%] bg-sky-300/20 transform -rotate-45 origin-center"></div>
        <div className="absolute top-0 left-1/3 w-px h-full bg-sky-400/30"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-sky-400/30"></div>
      </div>

      {/* Pseudo-code snippets */}
      <div className="absolute inset-0 code-snippet-bg">
        {codeSnippets.map(snippet => (
          <pre key={snippet.id} className="code-block" style={snippet.style}>
            {snippet.content}
          </pre>
        ))}
      </div>
      
      {/* Main Content: Spinner and Text */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <LoadingSpinner />
        <h1 className="mt-8 text-2xl sm:text-3xl font-semibold text-sky-700 uppercase tracking-wider">
          Initializing Systems
        </h1>
        <p className="mt-2 text-sm sm:text-base text-sky-600 uppercase tracking-wide animate-text-pulse-subtle">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
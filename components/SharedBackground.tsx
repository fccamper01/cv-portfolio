import React, { useEffect, useState } from 'react';

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

interface SharedBackgroundProps {
  // Props can be added here for customization if needed, e.g., colors
  snippetOpacity?: number;
  snippetColor?: string;
  panel1Color?: string;
  panel2Color?: string;
  lineColor?: string;
}

const SharedBackground: React.FC<SharedBackgroundProps> = ({
  snippetOpacity = 0.05, // Default opacity for snippets
  snippetColor = '#374151', // Default color (Tailwind gray-700)
  panel1Color = 'bg-white/10',
  panel2Color = 'bg-sky-500/5',
  lineColor = 'bg-slate-400/20',
}) => {
  const [codeSnippets, setCodeSnippets] = useState<Array<{id: number; style: React.CSSProperties; content: string}>>([]);

  useEffect(() => {
    const newSnippets = [];
    const numSnippets = 15; // Slightly fewer for placeholder sections perhaps, or keep consistent
    for (let i = 0; i < numSnippets; i++) {
      newSnippets.push({
        id: i,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `translate(-${Math.random() * 50}%, -${Math.random() * 50}%) scale(${0.3 + Math.random() * 0.3})`,
          opacity: (snippetOpacity - 0.01) + Math.random() * 0.02, // Tweak opacity slightly around the prop
          color: snippetColor,
        },
        content: generateCodeContent()
      });
    }
    setCodeSnippets(newSnippets);
  }, [snippetOpacity, snippetColor]); // Re-generate if these props change

  return (
    <>
      {/* Background geometric shapes */}
      <div className="absolute inset-0 opacity-80 z-[1]">
        <div className={`absolute -top-1/4 -left-1/3 w-3/5 h-[160%] ${panel1Color} transform -rotate-[30deg] origin-center rounded-3xl`}></div>
        <div className={`absolute -bottom-1/4 -right-1/3 w-3/5 h-[160%] ${panel2Color} transform rotate-[25deg] origin-center rounded-3xl`}></div>
        <div className={`absolute top-0 left-1/4 w-px h-full ${lineColor}`}></div>
        <div className={`absolute top-0 left-3/4 w-px h-full ${lineColor}`}></div>
        <div className={`absolute top-1/4 left-0 w-full h-px ${lineColor}`}></div>
        <div className={`absolute top-3/4 left-0 w-full h-px ${lineColor}`}></div>
      </div>

      {/* Pseudo-code snippets */}
      <div className="absolute inset-0 code-snippet-bg z-[2]">
        {codeSnippets.map(snippet => (
          <pre key={snippet.id} className="code-block" style={{...snippet.style, pointerEvents: 'none'}}>
            {snippet.content}
          </pre>
        ))}
      </div>
    </>
  );
};

export default SharedBackground;
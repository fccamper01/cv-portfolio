import React, { useState, useEffect, useCallback } from 'react';

const CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*&%$#@!?<>[]{}()";
const SCRAMBLE_ITERATIONS_PER_CHAR = 5; // How many times each char scrambles
const SCRAMBLE_SPEED_MS = 40; // Speed of each scramble iteration
const SETTLE_TIME_MS = 50; // Time the correct char is shown in "scrambling" slot before being added
const NEXT_CHAR_DELAY_MS = 30; // Delay before starting animation for the next character

interface MatrixTextProps {
  finalText: string;
  className?: string;
  onComplete?: () => void;
  style?: React.CSSProperties; // Added style prop
}

const getRandomChar = () => CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)];

const MatrixText: React.FC<MatrixTextProps> = ({ finalText, className, onComplete, style }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [scramblingChar, setScramblingChar] = useState('');
  const [revealedCount, setRevealedCount] = useState(0);

  const animateChar = useCallback((charIndex: number) => {
    if (charIndex >= finalText.length) {
      setScramblingChar(''); // Clear any lingering scrambling char
      if (onComplete) {
        onComplete();
      }
      return;
    }

    const targetChar = finalText[charIndex];
    let currentScrambleIteration = 0;

    const scrambleInterval = setInterval(() => {
      if (currentScrambleIteration < SCRAMBLE_ITERATIONS_PER_CHAR) {
        setScramblingChar(getRandomChar());
        currentScrambleIteration++;
      } else {
        clearInterval(scrambleInterval);
        setScramblingChar(targetChar); // Settle on the target character

        setTimeout(() => {
          setDisplayedText(prev => prev + targetChar);
          setScramblingChar(''); // Clear for next char or end
          setRevealedCount(prev => prev + 1); // This will trigger useEffect for the next character
        }, SETTLE_TIME_MS);
      }
    }, SCRAMBLE_SPEED_MS);

    return () => clearInterval(scrambleInterval);
  }, [finalText, onComplete]);

  useEffect(() => {
    // This effect triggers animation for the next character when revealedCount changes
    if (revealedCount < finalText.length) {
      const timeoutId = setTimeout(() => {
         animateChar(revealedCount);
      }, revealedCount === 0 ? 0 : NEXT_CHAR_DELAY_MS); // No delay for the first char
      return () => clearTimeout(timeoutId);
    } else if (revealedCount === finalText.length && finalText.length > 0) {
        // Ensure onComplete is called if animation finishes quickly or text is empty
        if (onComplete) {
            onComplete();
        }
    }
  }, [revealedCount, finalText, animateChar, onComplete]);
  
  // Reset animation if finalText changes
  useEffect(() => {
    setDisplayedText('');
    setScramblingChar('');
    setRevealedCount(0);
  }, [finalText]);


  return (
    <h1 className={className} style={style} aria-label={finalText} aria-live="polite">
      {displayedText}
      {scramblingChar && <span className="opacity-75">{scramblingChar}</span>}
    </h1>
  );
};

export default MatrixText;
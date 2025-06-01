import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  textToType: string;
  typingSpeedMs?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
  startCondition?: boolean; // Condition to start animation
}

const TypingText: React.FC<TypingTextProps> = ({
  textToType,
  typingSpeedMs = 50,
  className,
  style,
  onComplete,
  startCondition = true, // Default to start immediately if rendered
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText(''); // Reset if textToType changes
    setCurrentIndex(0);
  }, [textToType]);

  useEffect(() => {
    if (!startCondition || currentIndex >= textToType.length) {
      if (startCondition && currentIndex >= textToType.length && onComplete) {
        onComplete();
      }
      return;
    }

    const timeoutId = setTimeout(() => {
      setDisplayedText((prev) => prev + textToType[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, typingSpeedMs);

    return () => clearTimeout(timeoutId);
  }, [textToType, typingSpeedMs, currentIndex, onComplete, startCondition]);

  return (
    <p className={className} style={style} aria-label={textToType} aria-live="polite">
      {displayedText}
      {/* Optional: Add a blinking cursor effect */}
      {startCondition && currentIndex < textToType.length && (
        <span className="inline-block w-px h-[1em] bg-current opacity-75 animate-pulse ml-px"></span>
      )}
    </p>
  );
};

export default TypingText;
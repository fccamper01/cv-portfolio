import React from 'react';

const LoadingSpinner: React.FC = () => {
  const radius = 60;
  const strokeWidth = 12; 
  const circumference = 2 * Math.PI * (radius - strokeWidth / 2);
  const segmentDasharray = `${circumference / 4} ${circumference * 3 / 4}`;

  const segments = [
    { class: 'segment segment-delay-1', offsetRatio: 0, color: 'text-sky-400' }, // Changed from indigo-500
    { class: 'segment segment-delay-2', offsetRatio: 0.25, color: 'text-sky-300' }, // Changed from indigo-400
    { class: 'segment segment-delay-3', offsetRatio: 0.5, color: 'text-sky-500' }, // Changed from indigo-600
    { class: 'segment segment-delay-4', offsetRatio: 0.75, color: 'text-sky-400' }, // Changed from indigo-500
  ];

  return (
    <div className="relative w-36 h-36 sm:w-48 sm:h-48">
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Base faint circle */}
        <circle
          cx="60"
          cy="60"
          r={radius - strokeWidth / 2}
          stroke="currentColor"
          className="text-slate-500/30" 
          strokeWidth={strokeWidth * 0.6} 
        />
        
        {/* Animated Segments */}
        {segments.map((seg, index) => (
            <circle
              key={index}
              cx="60"
              cy="60"
              r={radius - strokeWidth / 2}
              stroke="currentColor"
              className={`${seg.color} ${seg.class}`}
              strokeWidth={strokeWidth}
              strokeDasharray={segmentDasharray}
              strokeDashoffset={circumference * seg.offsetRatio} 
              strokeLinecap="round" 
              style={{
                transformOrigin: '50% 50%',
                transform: `rotate(${(index * 90)}deg)` 
              }}
            />
        ))}
      </svg>
      {/* Inner details */}
       <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-sky-500 rounded-full opacity-60"></div> {/* Changed from bg-indigo-600 */}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sky-400/60 text-[8px] font-mono" // Changed from text-indigo-500/60
           style={{ transform: `translate(-50%, -50%) rotate(15deg) translateX(${radius*0.6}px) rotate(-15deg)`}}>
           0A.23
      </div>
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sky-400/60 text-[8px] font-mono" // Changed from text-indigo-500/60
           style={{ transform: `translate(-50%, -50%) rotate(180deg) translateX(${radius*0.55}px) rotate(-180deg)`}}>
           SYS.RDY
      </div>
    </div>
  );
};

export default LoadingSpinner;
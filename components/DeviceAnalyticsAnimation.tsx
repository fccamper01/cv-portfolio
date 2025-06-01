import React, { useEffect, useRef } from 'react';

const DeviceAnalyticsAnimation: React.FC = () => {
  const lineGraphRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Dynamically set stroke-dasharray for line graph if needed,
    // though CSS fixed value often works well for stylized graphs.
    if (lineGraphRef.current) {
      const length = lineGraphRef.current.getTotalLength();
      lineGraphRef.current.style.strokeDasharray = `${length}`;
      lineGraphRef.current.style.strokeDashoffset = `${length}`;
      // Trigger animation by class or directly if CSS handles it
    }
  }, []);

  const baseDelay = 0.2; // s
  const stagger = 0.15; // s

  // Define colors from the image palette
  const bgColor = "hsl(225, 50%, 95%)"; // Light blue background
  const deviceColor = "hsl(230, 25%, 35%)"; // Darker grayish-blue for device bodies
  const screenColor = "hsl(225, 30%, 88%)"; // Lighter grey for screens
  const accentBlue = "hsl(220, 70%, 65%)"; // Existing blue, good.
  const accentLightBlue = "hsl(205, 70%, 70%)"; // New: Light Blue, replaces purple
  const accentTeal = "hsl(190, 60%, 60%)";
  const highlightWhite = "hsl(0, 0%, 98%)";
  const shadowColor = "hsla(230, 25%, 20%, 0.1)";

  const sparklePoints = [
    { cx: 50, cy: 70, delay: 0.1 }, { cx: 350, cy: 50, delay: 0.3 },
    { cx: 80, cy: 250, delay: 0.5 }, { cx: 320, cy: 280, delay: 0.2 },
    { cx: 200, cy: 30, delay: 0.4 }, { cx: 150, cy: 290, delay: 0.6 },
  ];

  return (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64"> {/* Adjusted size for better visibility */}
      <svg viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background Accent */}
        <circle cx="200" cy="175" r="180" fill={bgColor} className="da-element" style={{ animationDelay: `${baseDelay}s` }} />
        
        {/* Sparkles */}
        {sparklePoints.map((s, i) => (
          <path
            key={`sparkle-${i}`}
            d={`M${s.cx-5},${s.cy} L${s.cx-1},${s.cy-1} L${s.cx},${s.cy-5} L${s.cx+1},${s.cy-1} L${s.cx+5},${s.cy} L${s.cx+1},${s.cy+1} L${s.cx},${s.cy+5} L${s.cx-1},${s.cy+1} Z`}
            fill={highlightWhite}
            className="da-sparkle-item"
            style={{ animationDelay: `${baseDelay + s.delay + i * 0.1}s` }}
          />
        ))}

        {/* Ground Line */}
        <line x1="30" y1="315" x2="370" y2="315" stroke={deviceColor} strokeWidth="2" className="da-element" style={{ animationDelay: `${baseDelay + stagger}s` }}/>

        {/* Laptop */}
        <g className="da-slide-up-element" style={{ animationDelay: `${baseDelay + stagger * 2}s` }}>
          {/* Laptop Base */}
          <rect x="100" y="220" width="200" height="90" rx="5" fill={deviceColor} />
          <rect x="90" y="305" width="220" height="10" rx="3" fill={deviceColor} /> {/* Keyboard part */}
          {/* Laptop Screen */}
          <rect x="115" y="100" width="170" height="125" rx="5" fill={deviceColor} />
          <rect x="120" y="105" width="160" height="115" rx="3" fill={screenColor} />

          {/* Laptop Screen Content */}
          {/* Window controls */}
          <circle cx="128" cy="112" r="2.5" fill="hsl(0, 60%, 60%)" className="da-element" style={{ animationDelay: `${baseDelay + stagger * 3}s` }} />
          <circle cx="136" cy="112" r="2.5" fill="hsl(40, 60%, 60%)" className="da-element" style={{ animationDelay: `${baseDelay + stagger * 3.1}s` }} />
          <circle cx="144" cy="112" r="2.5" fill="hsl(100, 60%, 60%)" className="da-element" style={{ animationDelay: `${baseDelay + stagger * 3.2}s` }} />
          
          {/* Pie Chart (Laptop) */}
          <g transform="translate(150, 140)">
            <circle cx="0" cy="0" r="15" fill={accentLightBlue} className="da-pie-slice" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)', animationDelay: `${baseDelay + stagger * 4}s` }}/>
            <circle cx="0" cy="0" r="15" fill={accentTeal} className="da-pie-slice" style={{ clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)', animationDelay: `${baseDelay + stagger * 4.5}s` }}/>
          </g>

          {/* Line Graph (Laptop) */}
          <g transform="translate(185, 130)">
            <path ref={lineGraphRef} d="M0,40 L15,30 L30,35 L45,20 L60,25" stroke={accentBlue} strokeWidth="2" fill="none" className="da-line-graph" style={{ animationDelay: `${baseDelay + stagger * 5}s` }}/>
            {[0,15,30,45,60].map((val, i) => (
              <circle key={`lgp-${i}`} cx={val} cy={val === 0 ? 40 : (val === 15 ? 30 : (val === 30 ? 35 : (val === 45 ? 20 : 25)))} r="2" fill={accentBlue} className="da-element" style={{ animationDelay: `${baseDelay + stagger * (5.5 + i * 0.2)}s` }} />
            ))}
          </g>

          {/* Bar Chart (Laptop) */}
          <g transform="translate(130, 185)">
            {[30, 20, 25].map((h, i) => (
              <rect key={`lbc-${i}`} x={i * 12} y={20 - h} width="8" height={h} fill={accentLightBlue} className="da-bar" style={{ animationDelay: `${baseDelay + stagger * (6 + i * 0.3)}s` }}/> 
            ))}
          </g>
           {/* Hamburger menu icon */}
           <g transform="translate(255, 110)" className="da-element" style={{ animationDelay: `${baseDelay + stagger * 3.5}s` }}>
            <line x1="0" y1="0" x2="10" y2="0" stroke={deviceColor} strokeWidth="1.5" />
            <line x1="0" y1="4" x2="10" y2="4" stroke={deviceColor} strokeWidth="1.5" />
            <line x1="0" y1="8" x2="10" y2="8" stroke={deviceColor} strokeWidth="1.5" />
          </g>
        </g>

        {/* Phone */}
        <g className="da-slide-up-element" style={{ animationDelay: `${baseDelay + stagger * 2.5}s` }}>
          <rect x="40" y="190" width="55" height="110" rx="8" fill={deviceColor}/>
          <rect x="44" y="195" width="47" height="90" rx="3" fill={screenColor}/>
          {/* Phone Screen Content */}
          {/* Bar Chart (Phone) */}
          <g transform="translate(50, 245)">
            {[25, 15, 30, 20].map((h, i) => (
              <rect key={`pbc-${i}`} x={i * 8} y={30 - h} width="5" height={h} fill={accentTeal} className="da-bar" style={{ animationDelay: `${baseDelay + stagger * (7 + i * 0.2)}s` }} />
            ))}
          </g>
          {/* Placeholder text lines (Phone) */}
          {[210, 217, 224].map((yPos, i) => (
            <rect key={`ptl-${i}`} x="50" y={yPos} width="35" height="3" fill={deviceColor} opacity="0.5" className="da-element" style={{ animationDelay: `${baseDelay + stagger * (7.5 + i * 0.2)}s` }}/>
          ))}
           {/* Phone top speaker/sensor */}
          <rect x="58" y="198" width="20" height="3" rx="1.5" fill={deviceColor} className="da-element" style={{ animationDelay: `${baseDelay + stagger * 3}s` }} />
        </g>
        
        {/* Subtle shadows */}
        <ellipse cx="200" cy="318" rx="100" ry="5" fill={shadowColor} className="da-element" style={{ animationDelay: `${baseDelay + stagger * 1.5}s` }}/>
        <ellipse cx="67" cy="303" rx="25" ry="3" fill={shadowColor} className="da-element" style={{ animationDelay: `${baseDelay + stagger * 1.8}s` }}/>

      </svg>
    </div>
  );
};

export default DeviceAnalyticsAnimation;
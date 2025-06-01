
import React, { useEffect, useState, useRef, useCallback } from 'react';

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
  snippetOpacity?: number;
  snippetColor?: string;
  particleColor?: string;
  networkLineColor?: string;
  mouseNetLineColor?: string;
  mouseNetLineWidth?: number;
  particleCount?: number;
  interactionDistance?: number;
  mouseInteractionDistance?: number;
  panel1Color?: string;
  panel2Color?: string;
  animateLines?: boolean;
  animationDelayBase?: number;
  animationDuration?: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  originalVx: number;
  originalVy: number;
}

interface EffectiveParams {
  particleCount: number;
  interactionDistance: number;
  mouseInteractionDistance: number;
  particleColor: string;
  networkLineColor: string;
  mouseNetLineColor: string;
  mouseNetLineWidth: number;
  generalLineWidthBase: number;
  generalLineWidthFactor: number;
  generalLineOpacityBase: number;
  generalLineOpacityFactor: number;
  mouseNetLineOpacityBase: number;
}

const SharedBackground: React.FC<SharedBackgroundProps> = ({
  snippetOpacity = 0.05,
  snippetColor = '#374151', // slate-700
  // Mobile/Default values (from previous "darker and bigger" update)
  particleColor: particleColorProp = 'rgba(56, 189, 248, 0.5)', // sky-400 with opacity
  networkLineColor: networkLineColorProp = 'rgba(14, 165, 233, 0.45)', // sky-500 with 45% opacity
  mouseNetLineColor: mouseNetLineColorProp = 'rgba(14, 165, 233, 0.95)', // sky-500 with 95% opacity
  mouseNetLineWidth: mouseNetLineWidthProp = 2.5,
  particleCount: particleCountProp = 100,
  interactionDistance: interactionDistanceProp = 150,
  mouseInteractionDistance: mouseInteractionDistanceProp = 180,
}) => {
  const [codeSnippets, setCodeSnippets] = useState<Array<{id: number; style: React.CSSProperties; content: string}>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  
  const effectiveParamsRef = useRef<EffectiveParams>({
    // Default values, will be updated
    particleCount: particleCountProp,
    interactionDistance: interactionDistanceProp,
    mouseInteractionDistance: mouseInteractionDistanceProp,
    particleColor: particleColorProp,
    networkLineColor: networkLineColorProp,
    mouseNetLineColor: mouseNetLineColorProp,
    mouseNetLineWidth: mouseNetLineWidthProp,
    generalLineWidthBase: 0.3,
    generalLineWidthFactor: 1.8,
    generalLineOpacityBase: 0.2,
    generalLineOpacityFactor: 0.6,
    mouseNetLineOpacityBase: 0.65,
  });

  const updateEffectiveParams = useCallback(() => {
    const isDesktop = window.innerWidth > 768; // Tailwind 'md' breakpoint

    if (isDesktop) {
        effectiveParamsRef.current = {
            particleCount: 85, // Increased from 70
            interactionDistance: 135, // Increased from 120
            mouseInteractionDistance: 165, // Increased from 150
            particleColor: 'rgba(56, 189, 248, 0.45)', // Slightly more opaque particles
            networkLineColor: 'rgba(14, 165, 233, 0.40)', // Increased opacity from 0.30
            mouseNetLineColor: 'rgba(14, 165, 233, 0.92)', // Increased opacity from 0.90
            mouseNetLineWidth: 2.2, // Increased from 2.0
            generalLineWidthBase: 0.25, // Increased from 0.2
            generalLineWidthFactor: 1.65, // Increased from 1.5
            generalLineOpacityBase: 0.18, // Increased from 0.15
            generalLineOpacityFactor: 0.55, // Increased from 0.5
            mouseNetLineOpacityBase: 0.60, // Increased from 0.55
        };
    } else {
        effectiveParamsRef.current = {
            particleCount: particleCountProp,
            interactionDistance: interactionDistanceProp,
            mouseInteractionDistance: mouseInteractionDistanceProp,
            particleColor: particleColorProp,
            networkLineColor: networkLineColorProp,
            mouseNetLineColor: mouseNetLineColorProp,
            mouseNetLineWidth: mouseNetLineWidthProp,
            generalLineWidthBase: 0.3,
            generalLineWidthFactor: 1.8,
            generalLineOpacityBase: 0.2,
            generalLineOpacityFactor: 0.6,
            mouseNetLineOpacityBase: 0.65,
        };
    }
  }, [
      particleColorProp, networkLineColorProp, mouseNetLineColorProp, 
      mouseNetLineWidthProp, particleCountProp, interactionDistanceProp, 
      mouseInteractionDistanceProp
  ]);


  useEffect(() => {
    const newSnippets = [];
    const numSnippets = 15;
    for (let i = 0; i < numSnippets; i++) {
      newSnippets.push({
        id: i,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `translate(-${Math.random() * 50}%, -${Math.random() * 50}%) scale(${0.3 + Math.random() * 0.3})`,
          opacity: (snippetOpacity - 0.01) + Math.random() * 0.02,
          color: snippetColor,
        },
        content: generateCodeContent()
      });
    }
    setCodeSnippets(newSnippets);
  }, [snippetOpacity, snippetColor]);

  const initializeParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const params = effectiveParamsRef.current;
    particles.current = [];
    for (let i = 0; i < params.particleCount; i++) {
      const radius = Math.random() * 1.5 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const vx = (Math.random() - 0.5) * 0.5;
      const vy = (Math.random() - 0.5) * 0.5;
      particles.current.push({ x, y, radius, vx, vy, originalVx: vx, originalVy: vy });
    }
  }, []);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      updateEffectiveParams();
      initializeParticles();
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        mousePosition.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }
    };

    const handleMouseOut = () => {
        mousePosition.current = { x: null, y: null };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const params = effectiveParamsRef.current;

      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x - p.radius < 0 || p.x + p.radius > canvas.width) p.vx *= -1;
        if (p.y - p.radius < 0 || p.y + p.radius > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = params.particleColor;
        ctx.fill();
      });

      for (let i = 0; i < particles.current.length; i++) {
        const p1 = particles.current[i];
        let p1IsNearMouse = false;
        let distanceToMouseP1 = Infinity;

        if (mousePosition.current.x !== null && mousePosition.current.y !== null) {
            distanceToMouseP1 = Math.sqrt((p1.x - mousePosition.current.x)**2 + (p1.y - mousePosition.current.y)**2);
            if (distanceToMouseP1 < params.mouseInteractionDistance) {
                p1IsNearMouse = true;
            }
        }

        for (let j = i + 1; j < particles.current.length; j++) {
            const p2 = particles.current[j];
            const distanceP1P2 = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

            if (distanceP1P2 < params.interactionDistance) {
                let p2IsNearMouse = false;
                if (mousePosition.current.x !== null && mousePosition.current.y !== null) {
                    const distanceToMouseP2 = Math.sqrt((p2.x - mousePosition.current.x)**2 + (p2.y - mousePosition.current.y)**2);
                    if (distanceToMouseP2 < params.mouseInteractionDistance) {
                        p2IsNearMouse = true;
                    }
                }

                const useMouseNetStyle = p1IsNearMouse || p2IsNearMouse;

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                
                if (useMouseNetStyle) {
                    ctx.strokeStyle = params.mouseNetLineColor;
                    ctx.lineWidth = params.mouseNetLineWidth;
                    ctx.globalAlpha = Math.max(params.mouseNetLineOpacityBase, (1 - distanceP1P2 / params.interactionDistance)); 
                } else {
                    ctx.strokeStyle = params.networkLineColor;
                    ctx.lineWidth = Math.max(params.generalLineWidthBase, params.generalLineWidthFactor * (1 - distanceP1P2 / params.interactionDistance));
                    ctx.globalAlpha = Math.max(params.generalLineOpacityBase, (1 - distanceP1P2 / params.interactionDistance) * params.generalLineOpacityFactor); 
                }
                ctx.stroke();
                ctx.globalAlpha = 1; 
            }
        }

        if (p1IsNearMouse && mousePosition.current.x !== null && mousePosition.current.y !== null) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mousePosition.current.x, mousePosition.current.y);
            ctx.strokeStyle = params.mouseNetLineColor;
            ctx.lineWidth = params.mouseNetLineWidth;
            ctx.globalAlpha = Math.max(params.mouseNetLineOpacityBase, (1 - distanceToMouseP1 / params.mouseInteractionDistance));
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvas(); // Call once to set initial size and params
    animate();

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleMouseOut);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseout', handleMouseOut);
    };
  }, [
      updateEffectiveParams, 
      initializeParticles
    ]); // Dependencies ensure effect re-runs if prop-derived update logic changes


  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-[0]" 
        aria-hidden="true"
      />
      <div className="absolute inset-0 code-snippet-bg z-[1]">
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

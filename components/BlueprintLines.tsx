
import React from 'react';

interface BlueprintLinesViewerProps { // Renamed from BlueprintLineProps to avoid confusion with SVG line elements if any local types were similar.
  isActive: boolean;
}

// Define configuration props for SvgShape's behavior (delay, active state)
interface SvgShapeConfigProps {
  delay: string;
  isActive: boolean;
  // elementType will be the discriminant
}

// Create a generic helper type that combines SvgShapeConfigProps with React's SVGProps for a specific element.
// It omits keys from SVGProps that are handled by SvgShapeConfigProps or are the discriminant itself.
type SvgElementSpecificProps<
  EType extends keyof JSX.IntrinsicElements,
  // Use React.SVGAttributes for a more general set of SVG attributes,
  // as React.SVGProps includes children, which we don't need for these self-closing elements.
  EProps = React.SVGAttributes<SVGElement>
> = SvgShapeConfigProps & 
  { elementType: EType } & 
  Omit<EProps, keyof SvgShapeConfigProps | 'elementType'>;

// Define prop types for each supported SVG element
type LineElShapeProps = SvgElementSpecificProps<'line', React.SVGAttributes<SVGLineElement>>;
type RectElShapeProps = SvgElementSpecificProps<'rect', React.SVGAttributes<SVGRectElement>>;
type CircleElShapeProps = SvgElementSpecificProps<'circle', React.SVGAttributes<SVGCircleElement>>;
type PathElShapeProps = SvgElementSpecificProps<'path', React.SVGAttributes<SVGPathElement>>;

// Create a union of all possible prop types for SvgShape
type AllSvgShapeProps = LineElShapeProps | RectElShapeProps | CircleElShapeProps | PathElShapeProps;

const SvgShape: React.FC<AllSvgShapeProps> = (allProps) => {
  // Destructure common styling/config props that might be passed directly to SvgShape
  // These are used to construct the final className and style.
  const {
    delay,
    isActive,
    className: inputElementClassName, // className explicitly passed to SvgShape component
    style: inputElementStyle,         // style explicitly passed to SvgShape component
    strokeDasharray: inputElementStrokeDasharray, // strokeDasharray explicitly passed to SvgShape component
  } = allProps;

  // Prepare common SVG attributes based on destructured values
  const finalStrokeDasharray = inputElementStrokeDasharray ?? "1000"; // Default dasharray if not provided
  
  // Combine internal animation-related classNames with any classNames passed via props
  const combinedClassName = `${isActive ? 'blueprint-shape-active' : 'blueprint-shape-initial'} ${inputElementClassName || ''}`.trim();
  
  // Combine animation delay style with any other styles passed via props
  const combinedStyle = { 
    animationDelay: delay, 
    ...(inputElementStyle || {}) 
  };

  // Static attributes common to all shapes rendered by this component
  const staticSvgAttributes = {
    stroke: "currentColor",
    strokeWidth: "0.5",
    fill: "none",
  };
  
  // Dynamic attributes (className, style, strokeDasharray) derived from props, common to all shapes
  const dynamicSvgAttributes = {
    className: combinedClassName,
    style: combinedStyle,
    strokeDasharray: finalStrokeDasharray,
  };

  // Switch based on the elementType from allProps to render the correct SVG element
  // with type-safe props.
  switch (allProps.elementType) {
    case 'line': {
      // Destructure all known/handled props for 'line' (config, common styling).
      // The remaining `...elementGeometricAttrs` will contain only line-specific attributes (x1, y1, x2, y2).
      const { 
        elementType:_e, delay:_d, isActive:_a, 
        className:_c, style:_s, strokeDasharray:_sd, 
        ...elementGeometricAttrs 
      } = allProps; // allProps is LineElShapeProps here
      return <line {...staticSvgAttributes} {...dynamicSvgAttributes} {...elementGeometricAttrs} />;
    }
    case 'rect': {
      const { 
        elementType:_e, delay:_d, isActive:_a, 
        className:_c, style:_s, strokeDasharray:_sd, 
        ...elementGeometricAttrs 
      } = allProps; // allProps is RectElShapeProps here
      return <rect {...staticSvgAttributes} {...dynamicSvgAttributes} {...elementGeometricAttrs} />;
    }
    case 'circle': {
      const { 
        elementType:_e, delay:_d, isActive:_a, 
        className:_c, style:_s, strokeDasharray:_sd, 
        ...elementGeometricAttrs 
      } = allProps; // allProps is CircleElShapeProps here
      return <circle {...staticSvgAttributes} {...dynamicSvgAttributes} {...elementGeometricAttrs} />;
    }
    case 'path': {
      const { 
        elementType:_e, delay:_d, isActive:_a, 
        className:_c, style:_s, strokeDasharray:_sd, 
        ...elementGeometricAttrs 
      } = allProps; // allProps is PathElShapeProps here
      return <path {...staticSvgAttributes} {...dynamicSvgAttributes} {...elementGeometricAttrs} />;
    }
    default:
      // This will provide a compile-time check that all cases in AllSvgShapeProps are handled.
      // If a new shape type is added to AllSvgShapeProps without a corresponding case, TypeScript will error here.
      const _exhaustiveCheck: never = allProps;
      return null;
  }
};

const BlueprintLines: React.FC<BlueprintLinesViewerProps> = ({ isActive }) => {
  return (
    <div 
      aria-hidden="true"
      className={`absolute inset-0 z-[5] flex items-center justify-center transition-opacity duration-700 ease-out text-indigo-400/50 pointer-events-none
                  ${isActive ? 'opacity-100' : 'opacity-0'}`}
    >
      <svg width="400" height="300" viewBox="0 0 400 300" className="overflow-visible">
        {/* Outer frame */}
        <SvgShape elementType="rect" x="50" y="25" width="300" height="250" delay="0.1s" isActive={isActive} strokeDasharray="1100" />

        {/* Inner grid lines */}
        <SvgShape elementType="line" x1="50" y1="100" x2="350" y2="100" delay="0.3s" isActive={isActive} strokeDasharray="300" />
        <SvgShape elementType="line" x1="50" y1="175" x2="350" y2="175" delay="0.4s" isActive={isActive} strokeDasharray="300" />
        <SvgShape elementType="line" x1="150" y1="25" x2="150" y2="275" delay="0.5s" isActive={isActive} strokeDasharray="250" />
        <SvgShape elementType="line" x1="250" y1="25" x2="250" y2="275" delay="0.6s" isActive={isActive} strokeDasharray="250" />
        
        {/* Central connecting lines / focus elements */}
        <SvgShape elementType="circle" cx="200" cy="150" r="20" delay="0.7s" isActive={isActive} strokeDasharray="126" />
        <SvgShape elementType="line" x1="150" y1="150" x2="180" y2="150" delay="0.8s" isActive={isActive} strokeDasharray="30"/>
        <SvgShape elementType="line" x1="220" y1="150" x2="250" y2="150" delay="0.8s" isActive={isActive} strokeDasharray="30"/>

        {/* Corner accents */}
        <SvgShape elementType="path" d="M60 35 h-10 v-10" delay="0.9s" isActive={isActive} strokeDasharray="30"/>
        <SvgShape elementType="path" d="M340 35 h10 v-10" delay="0.95s" isActive={isActive} strokeDasharray="30"/>
        <SvgShape elementType="path" d="M60 265 h-10 v10" delay="1.0s" isActive={isActive} strokeDasharray="30"/>
        <SvgShape elementType="path" d="M340 265 h10 v10" delay="1.05s" isActive={isActive} strokeDasharray="30"/>
      </svg>
    </div>
  );
};

export default BlueprintLines;

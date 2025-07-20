import { useEffect, useRef } from 'react';

interface DynamicSvgProps {
  src: string;
}

export default function DynamicSvg({ src }: DynamicSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(src);
        const svgText = await response.text();
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svgText;
          
          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.backgroundColor = 'white';
            svgElement.setAttribute('width', '100%');
            svgElement.setAttribute('height', 'auto');
          }
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };

    loadSvg();
  }, [src]);

  return (
    <div 
      ref={containerRef} 
      style={{
        width: '100%',
        marginBlock: '2rem',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
} 
import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Animation loop for ultra-smooth cursor movement
    const animateCursor = () => {
      const { x, y } = mouseRef.current;
      
      // Direct DOM manipulation for maximum performance
      const dotTransform = `translate3d(${x - 4}px, ${y - 4}px, 0) scale(${isHoveringRef.current ? 2.5 : 1})`;
      const ringTransform = `translate3d(${x - 20}px, ${y - 20}px, 0) scale(${isHoveringRef.current ? 1.5 : 1})`;
      
      dot.style.transform = dotTransform;
      ring.style.transform = ringTransform;
      
      rafRef.current = requestAnimationFrame(animateCursor);
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(animateCursor);

    const updateMousePosition = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, input, [data-interactive]')) {
        isHoveringRef.current = true;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!(e.target as Element).closest('a, button, input, [data-interactive]')) {
        isHoveringRef.current = false;
      }
    };

    // Use passive listeners for better performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-blue-400 transition-transform duration-150 ease-out"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000,
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-50 h-10 w-10 rounded-full border-2 border-blue-400/50 transition-transform duration-200 ease-out"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000,
        }}
      />
    </div>
  );
};

export default CustomCursor;

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target;
      const viewElement = target.closest('[data-cursor="view"]');
      const interactive = target.closest('a, button, [role="button"], input, textarea, [data-cursor="pointer"]');

      if (viewElement) {
        setIsHovered(true);
        setCursorText('VIEW');
      } else if (interactive) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp loop
    const render = () => {
      const speed = 0.2;
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center transition-all duration-200 ease-out select-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        cursorText === 'VIEW'
          ? 'w-20 h-20 bg-[#D0003A] text-white rounded-full shadow-lg border-2 border-[#141516] scale-100'
          : isHovered
          ? 'w-10 h-10 bg-[#007A3D]/40 backdrop-blur-sm border-2 border-[#141516] rounded-full scale-100'
          : 'w-4 h-4 bg-[#141516] rounded-full scale-100'
      }`}
      style={{ willChange: 'transform' }}
    >
      {cursorText === 'VIEW' && (
        <span
          ref={textRef}
          className="retro-mono text-xs font-bold tracking-widest text-[#F0E85A] animate-pulse"
        >
          VIEW
        </span>
      )}
    </div>
  );
}


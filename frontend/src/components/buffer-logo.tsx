import React from 'react';

export function BufferLogo({ className = 'w-6 h-6 text-white' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Top Layer */}
      <path 
        d="M2.5 7.5L12 2.5L21.5 7.5L12 12.5L2.5 7.5Z" 
        fill="currentColor" 
      />
      {/* Middle Layer */}
      <path 
        d="M2.5 12.2L12 17.2L21.5 12.2" 
        stroke="currentColor" 
        strokeWidth="2.4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Bottom Layer */}
      <path 
        d="M2.5 16.8L12 21.8L21.5 16.8" 
        stroke="currentColor" 
        strokeWidth="2.4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

export function BufferPlantIcon({ className = 'w-5 h-5 text-[#8fd98b]' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22V12" />
      <path d="M12 12C12 7.58172 8.41828 4 4 4C4 8.41828 7.58172 12 12 12Z" />
      <path d="M12 12C12 7.58172 15.5817 4 20 4C20 8.41828 16.4183 12 12 12Z" />
    </svg>
  );
}

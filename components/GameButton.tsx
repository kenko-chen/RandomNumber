import React from 'react';

interface GameButtonProps {
  displayNumber: number | string | null;
  isRolling: boolean;
  isFinished: boolean;
  onClick: () => void;
}

export const GameButton: React.FC<GameButtonProps> = ({
  displayNumber,
  isRolling,
  isFinished,
  onClick
}) => {
  // We use inline styles for the dynamic viewport-based sizing to strictly adhere to "1/5 screen width"
  // while adding a min-width for mobile usability.
  const sizeStyle = {
    width: '20vw',
    height: '20vw',
    minWidth: '220px', // Ensure it's clickable on mobile
    minHeight: '220px',
  };

  const fontSizeStyle = {
    fontSize: 'clamp(80px, 14vw, 150px)', // Approx 0.7 of 20vw, with min/max bounds
  };

  return (
    <div className="relative flex justify-center items-center py-8">
      {/* Outer Glow Ring (visible when rolling) */}
      {isRolling && (
        <div
          className="absolute rounded-full bg-yellow-400 opacity-30 animate-ping"
          style={sizeStyle}
        ></div>
      )}

      <button
        onClick={onClick}
        disabled={isRolling || isFinished}
        style={sizeStyle}
        className={`
          relative z-10 flex items-center justify-center rounded-full shadow-2xl transition-all duration-200
          border-8 
          ${isRolling
            ? 'bg-gradient-to-tr from-orange-400 to-yellow-400 border-yellow-200 scale-105 animate-pulse-fast'
            : isFinished
              ? 'bg-slate-800 border-slate-700 cursor-not-allowed grayscale'
              : 'bg-gradient-to-br from-indigo-500 to-purple-600 border-white hover:scale-105 active:scale-95 hover:shadow-indigo-500/50'
          }
        `}
      >
        <span
          style={fontSizeStyle}
          className={`
            font-black tracking-tighter leading-none select-none tabular-nums
            ${isRolling || !isFinished ? 'text-white drop-shadow-md' : 'text-slate-500'}
          `}
        >
          {displayNumber === null ? 'GO' : displayNumber}
        </span>

        {/* Helper text if needed */}
        {displayNumber === null && !isFinished && (
          <span className="absolute bottom-10 text-sm md:text-lg text-indigo-200 font-medium tracking-wide uppercase">
            點擊抽號
          </span>
        )}
      </button>
    </div>
  );
};
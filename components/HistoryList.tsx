import React from 'react';

interface HistoryListProps {
  history: number[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px bg-gray-300 flex-1"></div>
        <h3 className="text-gray-500 font-bold uppercase tracking-wider text-sm">歷史紀錄 ({history.length})</h3>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {history.map((num, index) => (
          <div 
            key={`${num}-${index}`}
            className="
              flex items-center justify-center w-12 h-12 md:w-16 md:h-16 
              bg-white rounded-lg shadow-sm border border-gray-200 
              text-xl md:text-2xl font-bold text-gray-800
              animate-[fadeIn_0.5s_ease-out]
            "
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};
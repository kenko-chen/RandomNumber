import React from 'react';

interface HistoryListProps {
  history: number[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px bg-slate-700 flex-1"></div>
        <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm">歷史紀錄 ({history.length})</h3>
        <div className="h-px bg-slate-700 flex-1"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {history.map((num, index) => (
          <div
            key={`${num}-${index}`}
            className="
              flex items-center justify-center w-12 h-12 md:w-16 md:h-16 
              bg-slate-900 rounded-lg shadow-sm border border-slate-700 
              text-xl md:text-2xl font-bold text-white
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
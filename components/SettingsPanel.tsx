import React, { useState } from 'react';
import { Settings, RotateCcw } from 'lucide-react';

interface SettingsPanelProps {
  maxNumber: number;
  onUpdateMaxNumber: (n: number) => void;
  onReset: () => void;
  disabled: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  maxNumber,
  onUpdateMaxNumber,
  onReset,
  disabled
}) => {
  const [inputValue, setInputValue] = useState(maxNumber.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Only allow digits, max 3 chars
    if (/^\d{0,3}$/.test(val)) {
      setInputValue(val);
      const num = parseInt(val, 10);
      if (!isNaN(num) && num > 0) {
        onUpdateMaxNumber(num);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <Settings className="w-5 h-5" />
          <span>設定最大號碼 (N):</span>
        </div>
        <input
          type="number"
          min="1"
          max="999"
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
          className="w-24 px-3 py-2 text-xl font-bold text-center border-2 border-indigo-100 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <button
        onClick={onReset}
        disabled={disabled}
        className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RotateCcw className="w-4 h-4" />
        重置
      </button>
    </div>
  );
};
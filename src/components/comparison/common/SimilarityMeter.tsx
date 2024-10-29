import React from 'react';

interface SimilarityMeterProps {
  value: number;
  label: string;
}

const getEmphasisStyles = (value: number) => {
  if (value > 80) return 'text-green-400 font-semibold scale-105';
  if (value < 20) return 'text-red-400 font-semibold scale-105';
  return 'text-gray-200';
};

const SimilarityMeter = ({ value, label }: SimilarityMeterProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between text-sm text-gray-400">
      <span>{label}</span>
      <span className={`font-bold transition-all duration-300 ${getEmphasisStyles(value)}`}>
        {value}%
      </span>
    </div>
    <div className="h-2 bg-gray-700 rounded-full">
      <div
        className="h-full bg-green-500 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default SimilarityMeter;
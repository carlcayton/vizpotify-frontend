import React from 'react';

interface SimilarityMeterProps {
  value: number;
  label: string;
}

const SimilarityMeter = ({ value, label }: SimilarityMeterProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between text-sm text-gray-400">
      <span>{label}</span>
      <span className="font-bold text-white">{value}%</span>
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
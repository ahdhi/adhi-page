import React from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const ProgressBar: React.FC = () => {
  const completion = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-800 z-40">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out relative overflow-hidden animate-shine"
        style={{ width: `${completion}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

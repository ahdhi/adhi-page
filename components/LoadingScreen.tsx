import React from 'react';

const LoadingScreen: React.FC = () => {
  const letters = ['A', 'D', 'H', 'I', '.','P','A','G','E'];

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <div className="flex items-center space-x-2 text-4xl md:text-6xl font-bold">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            style={{ animation: `bounce-letter 1.5s ease-in-out infinite ${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="w-48 h-1 bg-gray-700 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient-x" style={{ width: '100%', animationDuration: '2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;

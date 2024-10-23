import React from 'react';

export const Face: React.FC = () => {
  return (
    <div className="relative w-48 h-48">
      {/* Head shape */}
      <div className="absolute inset-0 bg-[#ffdbac] rounded-[45%] shadow-inner"></div>
      
      {/* Eyes */}
      <div className="absolute left-[25%] top-[40%] w-4 h-4 bg-[#2c3e50] rounded-full"></div>
      <div className="absolute right-[25%] top-[40%] w-4 h-4 bg-[#2c3e50] rounded-full"></div>
      
      {/* Eyebrows */}
      <div className="absolute left-[22%] top-[35%] w-6 h-1.5 bg-[#2c3e50] rounded-full"></div>
      <div className="absolute right-[22%] top-[35%] w-6 h-1.5 bg-[#2c3e50] rounded-full"></div>
      
      {/* Nose */}
      <div className="absolute left-1/2 top-[45%] -translate-x-1/2 w-4 h-6 bg-[#edc9a5] rounded-full"></div>
      
      {/* Mouth */}
      <div className="absolute left-1/2 top-[65%] -translate-x-1/2 w-12 h-1 bg-[#2c3e50] rounded-full"></div>
      
      {/* Ears */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-8 bg-[#ffdbac] rounded-l-lg"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-8 bg-[#ffdbac] rounded-r-lg"></div>
    </div>
  );
};
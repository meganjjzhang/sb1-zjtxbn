import React, { useState, useEffect } from 'react';
import { Face } from './components/Face';
import { generateHairs } from './utils/hairGenerator';

interface Hair {
  id: number;
  x: number;
  y: number;
  angle: number;
  removing?: boolean;
}

function App() {
  const [hairs, setHairs] = useState<Hair[]>([]);

  useEffect(() => {
    setHairs(generateHairs());
  }, []);

  const removeHair = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hairs.length === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    let closestHair = hairs[0];
    let closestDistance = Number.MAX_VALUE;

    hairs.forEach(hair => {
      if (!hair.removing) {
        const distance = Math.sqrt(
          Math.pow(hair.x - clickX, 2) + Math.pow(hair.y - clickY, 2)
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestHair = hair;
        }
      }
    });

    setHairs(currentHairs =>
      currentHairs.map(hair =>
        hair.id === closestHair.id ? { ...hair, removing: true } : hair
      )
    );

    setTimeout(() => {
      setHairs(currentHairs => currentHairs.filter(hair => hair.id !== closestHair.id));
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Hair Removal Game</h1>
        <p className="text-center text-gray-600 mb-8">Tap to remove hair!</p>
        
        <div 
          className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer p-8"
          onClick={removeHair}
        >
          {/* Base head */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48">
            <Face />
          </div>
          
          {/* Hair strands */}
          {hairs.map((hair) => (
            <div
              key={hair.id}
              className={`absolute w-[2px] h-[12px] bg-[#2c3e50] origin-bottom transition-all duration-500
                ${hair.removing ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
              style={{
                left: `${hair.x}%`,
                top: `${hair.y}%`,
                transform: `rotate(${hair.angle}deg)`,
              }}
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-gray-700">
            Remaining Hair: {hairs.filter(h => !h.removing).length}
          </p>
          {hairs.length === 0 && (
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reset Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
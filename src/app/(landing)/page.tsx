import { BentoDemo } from '@/components/Chat/BentoContainer';
import React from 'react';

const page = () => {
  return (
    <div className="px-2 pb-10 flex flex-col">
      <main className="h-[30vh] text-center flex flex-col align-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-400 py-16">
          AI avustaja
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-700">
          Kommunikoi älykkäästi ja luo upeita kuvia - kaikki yhdessä paikassa
        </h2>
      </main>
      <div className="h-auto min-h-[70vh]">
        <BentoDemo />
      </div>
    </div>
  );
};

export default page;

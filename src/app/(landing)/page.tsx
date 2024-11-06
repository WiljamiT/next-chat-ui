import { BentoDemo } from '@/components/Chat/BentoContainer';
import { WordPullUp } from '@/components/ui/pull-up';
import React from 'react';

const page = () => {
  return (
    <div className="px-2 pb-10 flex flex-col max-w-[1400px] m-auto">
      <main className="h-[30vh] text-center flex flex-col align-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-400 pt-16 pb-2">
          AI avustaja
        </h1>
        <h2 className="text-xl md:text-3xl text-gray-700 pt-6">
          Kommunikoi älykkäästi ja luo upeita kuvia
        </h2>
        <WordPullUp
          className="text-xl md:text-2xl text-gray-700 pt-6"
          words="Kaikki yhdessä paikassa"
        />
      </main>
      <div className="h-auto min-h-[70vh]">
        <BentoDemo />
      </div>
    </div>
  );
};

export default page;

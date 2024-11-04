import { BentoDemo } from '@/components/Chat/BentoContainer';
import React from 'react';

const page = () => {
  return (
    <div className="px-20 min-h-screen flex flex-col">
      <main className="h-[30vh]">
        <h1>Welcome</h1>
      </main>
      <div className="h-[70vh]">
        <BentoDemo />
      </div>
    </div>
  );
};

export default page;

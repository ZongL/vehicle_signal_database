'use client';


import GojsDiagram from '@/app/ui/ecus/GojsDiagram';
import DynamicPorts from '@/app/ui/ecus/Gojs2';

export default function Home() {
  return (
    <div>

      <main>
        <h1>GoJS Diagram in Next.js</h1>
        <GojsDiagram />
        {/* <DynamicPorts/> */}
      </main>
    </div>
  );
}
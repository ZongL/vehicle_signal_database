'use client';

import React, { useEffect, useRef } from 'react';
import { MyVeheeavis } from '@/app/ui/ecus/myveheeavis';

const defaultData = {
  modules: [
    { id: "1", name: "AutopilotECU", type: "ECU", position: { x: 350, y: 50, width: 150, height: 400, color: "#ccc" },
      leftArray: [{ portid: "leftport0", portcolor: 0 }, { portid: "leftport1", portcolor: 1 }],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [{ portid: "topport0", portcolor: 0 }],
      bottomArray: [{ portid: "bottomport0", portcolor: 0 }, { portid: "bottomport1", portcolor: 1 }]
    },
    { id: "2", name: "LeftController", type: "ECU", position: { x: 100, y: 100, width: 150, height: 280, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }, { portid: "rightport1", portcolor: 1 }],
      topArray: [{ portid: "topport0", portcolor: 0 }, { portid: "topport1", portcolor: 1 }],
      bottomArray: []
    },
    { id: "3", name: "RightController", type: "ECU", position: { x: 550, y: 120, width: 150, height: 200, color: "#ccc" },
      leftArray: [{ portid: "leftport0", portcolor: 0 }],
      rightArray: [],
      topArray: [],
      bottomArray: [{ portid: "bottomport4", portcolor: 0 }, { portid: "bottomport5", portcolor: 1 }]
    },
    { id: "4", name: "RearController", type: "ECU", position: { x: 350, y: 500, width: 150, height: 80, color: "#ccc" },
      leftArray: [{ portid: "leftport0", portcolor: 0 }],
      rightArray: [{ portid: "rightport4", portcolor: 0 }, { portid: "rightport5", portcolor: 1 }],
      topArray: [{ portid: "topport0", portcolor: 0 }, { portid: "topport1", portcolor: 1 }],
      bottomArray: []
    },
    { id: "5", name: "Door1", type: "ECU", position: { x: 100, y: 5, width: 50, height: 30, color: "#ccc" },
      leftArray: [],
      rightArray: [],
      topArray: [],
      bottomArray: [{ portid: "bottomport0", portcolor: 0 }]
    },
    { id: "6", name: "Door2", type: "ECU", position: { x: 220, y: 5, width: 50, height: 30, color: "#ccc" },
      leftArray: [],
      rightArray: [],
      topArray: [],
      bottomArray: [{ portid: "bottomport0", portcolor: 0 }]
    }
  ],
  connections: [
    { from: "AutopilotECU", to: "LeftController", fromPort: "leftport0", toPort: "rightport0", points: [10, 20] },
    { from: "AutopilotECU", to: "RightController", fromPort: "rightport0", toPort: "leftport0" },
    { from: "AutopilotECU", to: "RearController", fromPort: "bottomport0", toPort: "topport0" },
    { from: "LeftController", to: "Door1", fromPort: "topport0", toPort: "bottomport0" },
    { from: "LeftController", to: "Door2", fromPort: "topport1", toPort: "bottomport0" }
  ]
};

export default function Home() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const veheeavisRef = useRef<any>(null);

  useEffect(() => {
    if (diagramRef.current) {
      // 清空旧内容
      diagramRef.current.innerHTML = '';
      // 创建实例
      veheeavisRef.current = new MyVeheeavis(diagramRef.current, defaultData);
    }
    // 可选：清理
    return () => {
      if (diagramRef.current) diagramRef.current.innerHTML = '';
      veheeavisRef.current = null;
    };
  }, []);

  return (
    <div>
      <main>
        <h1>veheeavis Diagram in Next.js</h1>
        <div ref={diagramRef} style={{ width: 800, height: 600, border: '1px solid #ccc', background: '#fff' }} />
      </main>
    </div>
  );
}
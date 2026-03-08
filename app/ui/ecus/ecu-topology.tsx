'use client';

import React, { useEffect, useRef } from 'react';
import { MyVeheeavis } from '@/app/ui/ecus/myveheeavis';

const defaultData = {
  modules: [
    { id: "1", name: "AutopilotECU", type: "ECU", position: { x: 500, y: 50, width: 200, height: 600, color: "#ccc" },
      leftArray: [{ portid: "leftport0", portcolor: 0 }, { portid: "leftport1", portcolor: 1 }],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [{ portid: "topport0", portcolor: 0 }],
      bottomArray: [{ portid: "bottomport0", portcolor: 0 }, { portid: "bottomport1", portcolor: 1 }]
    },
    { id: "2", name: "LeftController", type: "ECU", position: { x: 250, y: 100, width: 160, height: 550, color: "#ccc" },
      leftArray: [{ portid: "leftport0", portcolor: 0 },{ portid: "leftport1", portcolor: 1 },{ portid: "leftport2", portcolor: 0 },{ portid: "leftport3", portcolor: 1 },{ portid: "leftport4", portcolor: 0 },{ portid: "leftport5", portcolor: 1 },{ portid: "leftport6", portcolor: 0 },{ portid: "leftport7", portcolor: 1 },{ portid: "leftport8", portcolor: 0 }],
      rightArray: [{ portid: "rightport0", portcolor: 0 }, { portid: "rightport1", portcolor: 1 }],
      topArray: [{ portid: "topport0", portcolor: 0 }, { portid: "topport1", portcolor: 1 }],
      bottomArray: [{ portid: "bottomport0", portcolor: 0 }]
    },
    { id: "3", name: "RightController", type: "ECU", position: { x: 800, y: 120, width: 160, height: 500, color: "#ccc" },
      leftArray: [{ portid: "leftport0", portcolor: 0 }],
      rightArray: [],
      topArray: [],
      bottomArray: [{ portid: "bottomport4", portcolor: 0 }, { portid: "bottomport5", portcolor: 1 }]
    },
    { id: "4", name: "RearController", type: "ECU", position: { x: 500, y: 730, width: 200, height: 200, color: "#ccc" },
      leftArray: [{ portid: "leftport0", portcolor: 0 }, { portid: "leftport1", portcolor: 1 }, { portid: "leftport2", portcolor: 0 }, { portid: "leftport3", portcolor: 1 }, { portid: "leftport4", portcolor: 0 }],
      rightArray: [{ portid: "rightport0", portcolor: 0 }, { portid: "rightport1", portcolor: 1 }, { portid: "rightport2", portcolor: 0 }],
      topArray: [],
      bottomArray: [{ portid: "bottomport0", portcolor: 0 }]
    },
    { id: "5", name: "DoorControllerFrontLeft", type: "ECU", position: { x: 250, y: 5, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [],
      topArray: [],
      bottomArray: [{ portid: "bottomport0", portcolor: 0 }]
    },
    { id: "6", name: "DoorControllerRearLeft", type: "ECU", position: { x: 370, y: 20, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [],
      topArray: [],
      bottomArray: [{ portid: "bottomport0", portcolor: 0 }]
    },
    { id: "7", name: "RearDomeLightCantrailLeft", type: "ECU", position: { x: 41, y: 138, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "8", name: "Headlight", type: "ECU", position: { x: 41, y: 185, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "9", name: "PakingCaliper(EPB)RearLeft", type: "ECU", position: { x: 41, y: 230, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "10", name: "Speaker", type: "ECU", position: { x: 41, y: 280, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "11", name: "AcceleratorPedalSensor", type: "ECU", position: { x: 41, y: 330, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "12", name: "AdaptiveDamperValveFL", type: "ECU", position: { x: 41, y: 380, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "13", name: "RideHeightSensorFL", type: "ECU", position: { x: 41, y: 430, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "15", name: "DriveInverterFront", type: "ECU", position: { x: 41, y: 490, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "16", name: "DriveInverterRearLeft", type: "ECU", position: { x: 41, y: 540, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "17", name: "DriveInverterRear", type: "ECU", position: { x: 180, y: 750, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "18", name: "TrailerController", type: "ECU", position: { x: 180, y: 795, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "19", name: "ChargePortController", type: "ECU", position: { x: 180, y: 840, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "20", name: "RearSteerActuator", type: "ECU", position: { x: 180, y: 875, width: 120, height: 36, color: "#ccc" },
      leftArray: [],
      rightArray: [{ portid: "rightport0", portcolor: 0 }],
      topArray: [],
      bottomArray: []
    },
    { id: "21", name: "Speaker2", type: "ECU", position: { x: 650, y: 920, width: 120, height: 36, color: "#ccc" },
      leftArray: [{ portid: "leftport0", portcolor: 0 }],
      rightArray: [],
      topArray: [],
      bottomArray: []
    },
    { id: "22", name: "AirSuspention", type: "ECU", position: { x: 800, y: 850, width: 120, height: 36, color: "#ccc" },
      leftArray: [{ portid: "leftport0", portcolor: 0 }],
      rightArray: [],
      topArray: [],
      bottomArray: []
    },
  ],
  connections: [
    { from: "AutopilotECU", to: "LeftController", fromPort: "leftport0", toPort: "rightport0", points: [10, 20] },
    { from: "AutopilotECU", to: "RightController", fromPort: "rightport0", toPort: "leftport0" },
    { from: "LeftController", to: "DoorControllerFrontLeft", fromPort: "topport0", toPort: "bottomport0" },
    { from: "LeftController", to: "DoorControllerRearLeft", fromPort: "topport1", toPort: "bottomport0" },
    { from: "LeftController", to: "RearDomeLightCantrailLeft", fromPort: "leftport0", toPort: "rightport0" },
    { from: "LeftController", to: "Headlight", fromPort: "leftport1", toPort: "rightport0" },
    { from: "LeftController", to: "PakingCaliper(EPB)RearLeft", fromPort: "leftport2", toPort: "rightport0" },
    { from: "LeftController", to: "Speaker", fromPort: "leftport3", toPort: "rightport0" },
    { from: "LeftController", to: "AcceleratorPedalSensor", fromPort: "leftport4", toPort: "rightport0" },
    { from: "LeftController", to: "AdaptiveDamperValveFL", fromPort: "leftport5", toPort: "rightport0" },
    { from: "LeftController", to: "RideHeightSensorFL", fromPort: "leftport6", toPort: "rightport0" },
    { from: "LeftController", to: "DriveInverterFront", fromPort: "leftport7", toPort: "rightport0" },
    { from: "LeftController", to: "DriveInverterRearLeft", fromPort: "leftport8", toPort: "rightport0" },
    { from: "LeftController", to: "RearController", fromPort: "bottomport0", toPort: "leftport0" },
    { from: "RearController", to: "DriveInverterRear", fromPort: "leftport1", toPort: "rightport0" },
    { from: "RearController", to: "TrailerController", fromPort: "leftport2", toPort: "rightport0" },
    { from: "RearController", to: "ChargePortController", fromPort: "leftport3", toPort: "rightport0" },
    { from: "RearController", to: "RearSteerActuator", fromPort: "leftport4", toPort: "rightport0" },
    { from: "RearController", to: "Speaker2", fromPort: "bottomport0", toPort: "leftport0" },
    { from: "RearController", to: "AirSuspention", fromPort: "rightport0", toPort: "leftport0" },
  ]
};

export default function ECUTopology() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const veheeavisRef = useRef<any>(null);

  useEffect(() => {
    if (diagramRef.current) {
      diagramRef.current.innerHTML = '';
      veheeavisRef.current = new MyVeheeavis(diagramRef.current, defaultData);
    }
    return () => {
      if (diagramRef.current) diagramRef.current.innerHTML = '';
      veheeavisRef.current = null;
    };
  }, []);

  return (
    <div
      ref={diagramRef}
      style={{
        width: 1050,
        height: 980,
        border: '1px solid #ccc',
        background: '#fff',
        position: 'relative',
      }}
    />
  );
}

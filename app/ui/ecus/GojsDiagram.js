
import { useEffect, useRef } from 'react';
import * as go from 'gojs';

export default function GojsDiagram() {
  const diagramDivRef = useRef(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const go = window.go;

      const myDiagram = new go.Diagram(diagramDivRef.current, {
        'undoManager.isEnabled': true,
      });

      const portColors = ['black', 'red', 'green', 'gray'];

      // Define the node template
      myDiagram.nodeTemplate = new go.Node('Table', {
        locationObjectName: 'BODY',
        locationSpot: go.Spot.Center,
        selectionObjectName: 'BODY',
      })
        .add(
          new go.Panel('Auto', {
            row: 1,
            column: 1,
            name: 'BODY',
            stretch: go.Stretch.Fill,
          })
            .add(
              new go.Shape('Rectangle', {
                fill: 'lightgray',
                stroke: 'gray',
                strokeWidth: 0.5,
                minSize: new go.Size(60, 60),
              })
            )
            .add(
              new go.TextBlock({
                margin: 10,
                textAlign: 'center',
                font: 'bold 14px Segoe UI, sans-serif',
                stroke: '#484848',
                editable: true,
              }).bindTwoWay('text', 'name')
            )
        );

      // Define port operations
      function addPort(side) {
        myDiagram.startTransaction('addPort');
        myDiagram.selection.each((node) => {
          if (!(node instanceof go.Node)) return;
          let i = 0;
          while (node.findPort(side + i.toString()) !== node) i++;
          const name = side + i.toString();
          const arr = node.data[side + 'Array'];
          if (arr) {
            const newportdata = {
              portId: name,
              portColor: portColors[Math.floor(Math.random() * portColors.length)],
            };
            myDiagram.model.insertArrayItem(arr, -1, newportdata);
          }
        });
        myDiagram.commitTransaction('addPort');
      }

      // Add some initial nodes
      myDiagram.model = go.Model.fromJson(`
        {
          "class": "go.GraphLinksModel",
          "copiesArrays": true,
          "copiesArrayObjects": true,
          "linkFromPortIdProperty": "fromPort",
          "linkToPortIdProperty": "toPort",
          "nodeDataArray": [
            {"key":1, "name":"Unit One", "loc":"101 204", "leftArray":[], "topArray":[], "bottomArray":[], "rightArray":[]},
            {"key":2, "name":"Unit Two", "loc":"320 152", "leftArray":[], "topArray":[], "bottomArray":[], "rightArray":[]}
          ],
          "linkDataArray": []
        }
      `);
    }
  }, []);

  return (
    <div>
      <div
        ref={diagramDivRef}
        style={{ width: '600px', height: '500px', border: '1px solid black' }}
      ></div>
      <button onClick={() => addPort('top')}>Add Top Port</button>
      <button onClick={() => addPort('bottom')}>Add Bottom Port</button>
      <button onClick={() => addPort('left')}>Add Left Port</button>
      <button onClick={() => addPort('right')}>Add Right Port</button>
    </div>
  );
}
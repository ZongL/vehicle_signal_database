import { useEffect, useRef } from 'react';
import * as go from 'gojs';

export default function GojsDiagram() {
  const diagramDivRef = useRef(null);
  const myDiagramRef = useRef(null); // 用于保存 myDiagram 实例
  const portColors = ['black', 'red', 'green', 'gray'];
  
  const addPort = (side) => {
    if (!myDiagramRef.current) {
      console.error('myDiagram is not initialized'); // 检查 myDiagram 是否初始化
      return;
    } 

    const myDiagram = myDiagramRef.current;
    myDiagram.startTransaction('addPort');
    myDiagram.selection.each((node) => {
      if (!(node instanceof go.Node)) {
        console.error('Selected item is not a node:', node); // 检查选择的是否是节点
        return;
      }
     
      let i = 0;
      while (node.findPort(side + i.toString()) !== node) i++;
      const name = side + i.toString();
      const arr = node.data[side + 'Array'];

      if (arr) {
        const newportdata = {
          portId: name,
          portColor: Math.floor(Math.random() * portColors.length), // 随机选择一个颜色索引
        };
        console.log('hit3');
        myDiagram.model.insertArrayItem(arr, -1, newportdata);
      }
    });
    myDiagram.commitTransaction('addPort');
    //myDiagram.updateAllTargetBindings(); // 强制重新渲染
    console.log('Updated node data:', myDiagram.model.nodeDataArray); // 打印更新后的节点数据
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const go = window.go;
      const myDiagram = new go.Diagram(diagramDivRef.current, {
        'undoManager.isEnabled': true,
      });
      myDiagramRef.current = myDiagram; // 将 myDiagram 保存到 ref 中
      console.log('myDiagram initialized:', myDiagram); // 打印 myDiagram 初始化状态

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
        )
        // 左侧端口
        .add(
          new go.Panel('Vertical', { 
            alignment: go.Spot.Left,
            name: 'LEFT_PORTS'
          })
          .bind('itemArray', 'leftArray', (portData_array) => {
            return portData_array.map((portData) => {    // 遍历数组中的每个对象
              //console.log(portData.portColor); // 打印 portData.portColor
            return new go.Shape('Rectangle', {
              fill: portColors[portData.portColor] || '#000000', 
              stroke: null,
              desiredSize: new go.Size(8, 8),
              portId: portData.portId, 
              fromSpot: go.Spot.Left,
              toSpot: go.Spot.Left,
              fromLinkable: true,
              toLinkable: true,
            });
          })
        }))
        // 顶部端口
        .add(
          new go.Panel('Horizontal', {
            alignment: go.Spot.Top,
            name: 'TOP_PORTS'
          }).bind('itemArray', 'topArray', (portData_array) => {
            return portData_array.map((portData) => {
            return new go.Shape('Rectangle', {
              fill: portColors[portData.portColor],
              stroke: null,
              desiredSize: new go.Size(8, 8),
              portId: portData.portId,
              fromSpot: go.Spot.Top,
              toSpot: go.Spot.Top,
              fromLinkable: true,
              toLinkable: true,
            });
          })
          }))
        // 底部端口
        .add(
          new go.Panel('Horizontal', {
            alignment: go.Spot.Bottom,
            name: 'BOTTOM_PORTS'
          }).bind('itemArray', 'bottomArray', (portData_array) => {
            return portData_array.map((portData) => {
            return new go.Shape('Rectangle', {
              fill: portColors[portData.portColor],
              stroke: null,
              desiredSize: new go.Size(8, 8),
              portId: portData.portId,
              fromSpot: go.Spot.Bottom,
              toSpot: go.Spot.Bottom,
              fromLinkable: true,
              toLinkable: true,
            });
          })
        }))
        // 右侧端口
        .add(
          new go.Panel('Vertical', {
            alignment: go.Spot.Right,
            name: 'RIGHT_PORTS'
          }).bind('itemArray', 'rightArray', (portData_array) => {
            return portData_array.map((portData) => {
            return new go.Shape('Rectangle', {
              fill: portColors[portData.portColor],
              stroke: null,
              desiredSize: new go.Size(8, 8),
              portId: portData.portId,
              fromSpot: go.Spot.Right,
              toSpot: go.Spot.Right,
              fromLinkable: true,
              toLinkable: true,
            });
          })
    }));

      console.log('hit5');

      // Add some initial nodes
      myDiagram.model = go.Model.fromJson(`
        {
          "class": "go.GraphLinksModel",
          "copiesArrays": true,
          "copiesArrayObjects": true,
          "pointsDigits": 1,
          "linkFromPortIdProperty": "fromPort",
          "linkToPortIdProperty": "toPort",
          "nodeDataArray": [
            {"key":1, "name":"DOMAIN", "loc":"101 204", 
            "leftArray":[{"portColor":0,"portId":"left0"}], 
            "topArray":[{"portColor":0,"portId":"top0"}], 
            "bottomArray":[{"portColor":0,"portId":"bottom0"}], 
            "rightArray":[{"portColor":0,"portId":"right0"}]},
            {"key":2, "name":"ZCU", "loc":"320 152", 
            "leftArray":[ {"portColor":3, "portId":"left0"} ], 
            "topArray":[ {"portColor":3, "portId":"top0"} ], 
            "bottomArray":[ {"portColor":3, "portId":"bottom0"} ], 
            "rightArray":[ {"portColor":3, "portId":"right0"} ]}
          ],
          "linkDataArray": [
            {"from":1,"to":2,"fromPort":"right0","toPort":"left0"}
          ]
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
      <button onClick={() => addPort('top')} style={{ margin: '5px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>AddTopPort</button>
      <button onClick={() => addPort('bottom')} style={{ margin: '5px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>AddBottomPort</button>
      <button onClick={() => addPort('left')} style={{ margin: '5px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>AddLeftPort</button>
      <button onClick={() => addPort('right')} style={{ margin: '5px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>AddRightPort</button>
    </div>
  );
}
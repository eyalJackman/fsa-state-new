import ReactFlow, {
  Controls,
  FlowElement,
  MiniMap,
  addEdge,
  ArrowHeadType,
  Elements,
  Edge,
} from "react-flow-renderer";
import { useEffect, useMemo, useRef, useState } from "react";
import "./Flow.css";
import ControlsFSA from "./ControlsFSA";
import FSATrans from "./FSATrans";

const flowStyle = { height: "100%", width: "100%", display: "inline-block" };

const log = console.log.bind(this);

const Flow = (props: any) => {
  const randX = () => Math.random() * 800;
  const randY = () => Math.random() * 500;

  const statePos = () => {
    return { x: randX(), y: randY() };
  };

  const stateStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    // width: "9rem",
    // height: "2rem",
    // alignItems: "center",
  };

  const states: any[] = [
    {
      id: "1",
      data: { label: "A", type: "node" },
      position: statePos(),
      style: stateStyle,
    },
    {
      id: "2",
      data: { label: "B", type: "node" },
      position: statePos(),
      style: stateStyle,
    },
    {
      id: "3",
      data: { label: "C", type: "node" },
      position: statePos(),
      style: stateStyle,
    },
    {
      id: "4",
      data: { label: "D", type: "node" },
      position: statePos(),
      style: stateStyle,
    },
  ];
  const edgeStart: {
    id: string;
    data: { type: string };
    source: string;
    target: string;
    label: string;
    arrowHeadType: string;
  }[] = [
    {
      id: "e1-2",
      data: { type: "edge" },
      source: "1",
      target: "2",
      label: "e",
      arrowHeadType: "arrowclosed" as ArrowHeadType,
    },
  ];

  const [elems, setElems] = useState(states.concat(edgeStart));
  const [edges, setEdges] = useState(edgeStart);

  useEffect(() => {
    if (elems.length === 0) {
      setEdges([]);
    } else if (elems[elems.length - 1].data.type === "edge") {
      setEdges((e) => [...e, elems[elems.length - 1]]);
    }
  }, [elems]);

  const clearHandler = () => {
    setElems([]);
  };

  const createElem = (stateName: string) => {
    if (
      stateName &&
      !elems.some((x) => x.data.type === "node" && x.data.label === stateName)
    ) {
      const newState = {
        id: Math.random().toString(36).slice(2),
        data: { label: stateName, type: "node" },
        position: statePos(),
        style: stateStyle,
      };
      setElems((allElems) => [...allElems, newState]);
    }
  };
  const newStateHandler = (event: string) => {
    createElem(event);
  };

  const newEdgeHandler = (node1: string, node2: string, trans: string) => {
    const f = (edge: string) => {
      const found = elems.findIndex(
        (e) => e.data.type === "node" && e.data.label === edge
      );
      return found !== -1 ? { id: elems[found].id, index: found } : false;
    };
    const nodeA = f(node1);
    const nodeB = f(node2);

    if (nodeA && nodeB) {
      // const edges: any[] = elems.filter((x) => x.data.type === "edge");
      // log(`edges: ${edges}`);

      const found = edges.findIndex(
        (x) => x.source === nodeA.id && x.target === nodeB.id
      );
      if (found !== -1) {
        const id = edges[found].id;
        edges[found].label += ` + ${trans}`;
        setElems([...elems.filter((x) => x.id !== id), edges[found]]);
      } else {
        const newEdge = {
          id: `e-${node1 + node2}`,
          label: trans,
          source: nodeA.id,
          target: nodeB.id,
          data: { type: "edge" },
          arrowHeadType: "arrowclosed" as ArrowHeadType,
        };
        setElems(addEdge(newEdge, elems));
      }
    }
  };
  const onLoad = (instance: any) => {
    instance.fitView();
  };

  const updateAll = (id: string) => {
    setElems(
      elems.map((el) => {
        return {
          ...el,
          style: {
            ...el.style,
            backgroundColor: el.id === id ? "black" : "white",
            color: el.id === id ? "white" : "black",
          },
        };
      })
    );
  };

  const delay = (ids: string[]) => {
    setTimeout(() => {
      updateAll(ids[0]);
      let newIDs = ids.slice(1);
      if (newIDs.length) {
        delay(newIDs);
      }
    }, 1000);
  };
  const moveChangeHandler = (input: string, start: string) => {
    if (input.length === 0 || start.length === 0) {
      return false;
    }
    let index: any = elems.findIndex((x) => x.data?.label === start);
    log(index);
    if (index === -1) {
      return false;
    } else {
      updateAll(elems[index].id);
      let curr = elems[index];
      let currStr: string = input;
      // let edges: any[] = elems
      //   .filter((elem) => elem.data.type === "edge")
      //   .map((edge) => {
      //     return {
      //       ...edge,
      //       trans: edge.label.split(" + "),
      //     };
      //   });
      const transitions = edges.map((edge) => edge.label.split(" + "));
      let sendIDs: string[] = [];
      log(edges);
      for (const char of currStr) {
        let arr: number[] = [];
        edges.forEach((edge, i) => {
          log(edge.trans);
          if (edge?.label === char) {
            arr.push(i);
          }
        });
        if (arr.length > 0) {
          const randEdge = edges[arr[Math.floor(Math.random() * arr.length)]];
          log(randEdge);
          const findNode = elems.findIndex((x) => x.id === randEdge.target);
          if (curr.id === randEdge.source && findNode !== -1) {
            // setTimeout(() => {
            log("in here");
            curr = elems[findNode];
            log(elems[findNode].id);
            sendIDs.push(elems[findNode].id);
            // }, 1000);
          }
        } else {
          return false;
        }
      }
      delay(sendIDs);
    }
  };

  return (
    <div className="Flow-full">
      <span style={{ fontSize: "48px", fontWeight: "bold" }}>
        Finite State Automaton
      </span>
      <div className="Flow-graph">
        <ReactFlow
          preventScrolling
          elements={elems}
          style={flowStyle}
          onLoad={onLoad}
          onNodeDragStart={(event, node) => {
            event.preventDefault();
            // node.style?.backgroundColor = 'green';
          }}
        >
          <MiniMap
            nodeStrokeColor={(x) => "black"}
            nodeColor={(x) => "#777B79"}
            maskColor="#3A3B3C"
          />
          <Controls />
        </ReactFlow>
      </div>
      <div className="Flow-graph">
        <ControlsFSA
          className="container"
          onClear={clearHandler}
          onNewState={newStateHandler}
          onNewEdge={newEdgeHandler}
          onMove={moveChangeHandler}
          elements={elems}
        />
        <br />
      </div>
    </div>
  );
};

export default Flow;

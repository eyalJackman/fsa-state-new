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
  };

  const states: FlowElement<any>[] | undefined = [
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
  const edges = [
    {
      id: "e1-2",
      data: { type: "edge" },
      source: "1",
      target: "2",
      label: "edge",
    },
  ];

  const [elems, setElems] = useState(states.concat(edges));

  const clearHandler = () => {
    setElems([]);
  };

  const createElem = (stateName: string) => {
    log(elems);
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

  const newEdgeHandler = (edge1: string, edge2: string, trans: string) => {
    const f = (edge: string) => {
      const found = elems.findIndex(
        (e) => e.data.type === "node" && e.data.label === edge
      );
      return found !== -1 ? { id: elems[found].id, index: found } : false;
    };
    const edgeA = f(edge1);
    const edgeB = f(edge2);

    if (edgeA && edgeB) {
      const edges: any[] = elems.filter((x) => x.data.type === "edge");
      log(`edges: ${edges}`);

      const found = edges.findIndex(
        (x) => x.source === edgeA.id && x.target === edgeB.id
      );
      if (found !== -1) {
        const id = edges[found].id;
        log(edges[found].label);
        edges[found].label += ` + ${trans}`;
        setElems([...elems.filter((x) => x.id !== id), edges[found]]);
      } else {
        const newEdge = {
          id: `e-${edge1 + edge2}`,
          label: trans,
          source: edgeA.id,
          target: edgeB.id,
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
  const [id, setID] = useState("");
  const [bool, setBool] = useState(true);
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      setElems(
        elems.map((elem) => {
          // log(elems);
          if (elem.id === id) {
            let color = elem?.style?.backgroundColor;
            log(elem.id);
            elem.style = {
              ...elem.style,
              // !bool ? "black" : "white",
              backgroundColor: color === "white" ? "black" : "white",
            };
          }
          // setTimeout(() => setBool((b) => !b), 1000);
          return elem;
        })
      );
    } else {
      didMountRef.current = true;
    }
  }, [id]);
  // useEffect(() => {
  //   setElems((elems) =>
  //     elems.map((elem) => {
  //       if (elem.id === id) {
  //         elem.style = {
  //           ...elem.style,
  //           backgroundColor: !bool ? "black" : "white",
  //           // elem?.style?.backgroundColor === "white" ? "black" : "white",
  //         };
  //       }
  //       return elem;
  //     })
  //   );
  //   setBool((boo) => !boo);
  // }, [id]);

  const moveChangeHandler = (input: string, start: string) => {
    if (!input.length || !start.length) {
      return;
    }
    let index: any = elems.findIndex((x) => x.data?.label === start);
    log(index);
    if (index === -1) {
      return false;
    } else {
      elems.map((elem) => {
        // log(elems);
        if (elem.id === id) {
          let color = elem?.style?.backgroundColor;
          log(elem.id);
          elem.style = {
            ...elem.style,
            backgroundColor: color === "white" ? "black" : "white",
          };
        }
        return elem;
      });
      setID(elems[index].id);
      // setTimeout(() => {}, 1000);
      // setID("B");
      // setTimeout(() => {}, 1000);
      // setID("C");
      // setTimeout(() => {}, 1000);
      // setID("B");
    }
    setTimeout(() => {}, 1000);
    log(input.slice(1));
    log(input.charAt(0));
    moveChangeHandler(input.slice(1), input.charAt(0));
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
          />
          <Controls />
        </ReactFlow>
      </div>
      <div className="Flow-controls">
        <ControlsFSA
          onClear={clearHandler}
          onNewState={newStateHandler}
          onNewEdge={newEdgeHandler}
        />
        <br />
      </div>
      <div className="Flow-FSA-mvmt">
        <br />
        <FSATrans elements={elems} onMove={moveChangeHandler} />
        <button
          onClick={() => {
            if (elems[0] && elems[0].style) {
              elems[0].style.backgroundColor = "green";
              let items = [...elems];
              let item = { ...items[0] };
              setElems((elems) => [...elems]);
              let curr: FlowElement<any> = elems[0];
            }
          }}
        >
          Change Color
        </button>
      </div>
    </div>
  );
};

export default Flow;

import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode.jsx";

const nodeTypes = { custom: CustomNode };

const FlowBoard = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedIds, setSelectedIds] = useState({ nodes: [], edges: [] });
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [menuPosition, setMenuPosition] = useState(null); // NEW

  useEffect(() => {
    setHistory((prev) => [...prev, { nodes, edges }]);
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
      ),
    []
  );

  const undo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      const last = newHistory.pop();
      setRedoStack((r) => [...r, last]);
      const prev = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setNodes(prev.nodes);
      setEdges(prev.edges);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const newRedo = [...redoStack];
      const redoState = newRedo.pop();
      setHistory((h) => [...h, redoState]);
      setRedoStack(newRedo);
      setNodes(redoState.nodes);
      setEdges(redoState.edges);
    }
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = { x: event.clientX - 250, y: event.clientY - 40 };
      const newNode = {
        id: `${+new Date()}`,
        type: "custom",
        position,
        data: { label: type, type },
        selectable: true,
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onSelectionChange = useCallback(
    ({ nodes, edges }) => {
      setSelectedIds({
        nodes: nodes.map((n) => n.id),
        edges: edges.map((e) => e.id),
      });
    },
    [setSelectedIds]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        if (selectedIds.nodes.length > 0) {
          setNodes((nds) => nds.filter((n) => !selectedIds.nodes.includes(n.id)));
        }
        if (selectedIds.edges.length > 0) {
          setEdges((eds) => eds.filter((e) => !selectedIds.edges.includes(e.id)));
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIds, setNodes, setEdges]);

  // 👉 Right-click handler
  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const closeMenu = () => setMenuPosition(null);

  return (
    <ReactFlowProvider>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onSelectionChange={onSelectionChange}
          onNodeContextMenu={onNodeContextMenu} // 👈 added
          nodeTypes={nodeTypes}
          connectionLineType="smoothstep"
          connectionLineStyle={{ stroke: "red", strokeWidth: 2 }}
          fitView
        />
        <Controls />

        {/* Context menu */}
        {menuPosition && (
          <div
            style={{
              position: "absolute",
              top: menuPosition.y,
              left: menuPosition.x,
              background: "white",
              border: "1px solid black",
              padding: "5px",
              zIndex: 1000,
              cursor: "pointer",
            }}
            onClick={closeMenu}
          >
            Hello World
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
};

export default FlowBoard;

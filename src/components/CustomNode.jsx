// src/components/CustomNode.jsx
import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #333",
        borderRadius: 8,
        background: data.type === "blockA" ? "#bbf7d0" : "#fef08a",
        fontWeight: "bold",
        minWidth: 80,
        textAlign: "center",
        cursor: "move",        // 👈 shows draggable cursor
        pointerEvents: "all",  // 👈 ensures ReactFlow can drag
      }}
    >
      {data.label}

      {/* 👉 Example: only source handle */}
      {data.type === "blockA" && (
        <Handle type="source" position={Position.Right} />
      )}

      {/* 👉 Example: only target handle */}
      {data.type === "blockB" && (
        <Handle type="target" position={Position.Left} />
      )}
    </div>
  );
};

export default CustomNode;

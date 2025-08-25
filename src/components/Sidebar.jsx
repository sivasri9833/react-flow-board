// src/components/Sidebar.jsx
import React from "react";
import blocks from "../data/blocks.json";

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{ width: 150, padding: 10, borderRight: "1px solid #ccc" }}>
      <h3>Blocks</h3>
      {blocks.map((block) => (
        <div
          key={block.id}
          onDragStart={(event) => onDragStart(event, block.type)}
          draggable
          style={{
            padding: "8px",
            margin: "6px 0",
            background: "#fde68a",
            border: "1px solid #aaa",
            borderRadius: 6,
            textAlign: "center",
            cursor: "move",
          }}
        >
          {block.label}
        </div>
      ))}
    </aside>
  );
}

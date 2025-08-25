import React from "react";

export default function ContextMenu({ position, onClose }) {
  if (!position) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        background: "white",
        border: "1px solid #ccc",
        padding: "6px 10px",
        borderRadius: "4px",
        zIndex: 1000,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
      onClick={onClose} // click anywhere in menu closes it
    >
      hello world
    </div>
  );
}

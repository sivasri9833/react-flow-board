import React from "react";
import FlowBoard from "./components/FlowBoard.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* FlowBoard on left */}
      <div style={{ flex: 1 }}>
        <FlowBoard />
      </div>

      {/* Sidebar on right */}
      <Sidebar />
    </div>
  );
}

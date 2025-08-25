// src/components/CustomEdge.jsx
import React from "react";
import { BaseEdge, getStraightPath } from "reactflow";

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, markerEnd }) => {
  const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });

  return (
    <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
  );
};

export default CustomEdge;

import React from "react";
import { ComponentSchema } from "../../types";
import { DynamicRenderer } from "./DynamicRenderer";
// @ts-ignore
import "./GridComponent.css";

interface GridComponentProps {
  children?: ComponentSchema[];
  columns?: number;
  gap?: number;
  responsive?: boolean;
}

export const GridComponent: React.FC<GridComponentProps> = ({
  children = [],
  columns = 2,
  gap = 20,
  responsive = true,
}) => {
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: responsive
      ? `repeat(auto-fit, minmax(300px, 1fr))`
      : `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
  };

  return (
    <div className="grid-component" style={gridStyle}>
      {children.map((child, index) => (
        <div key={child.id || index} className="grid-item">
          <DynamicRenderer schema={child} />
        </div>
      ))}
    </div>
  );
};

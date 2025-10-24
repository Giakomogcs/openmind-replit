import React from 'react';
import { ComponentSchema } from '../../types';
import './GridComponent.css';

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
  const DynamicRenderer = React.lazy(() =>
    import('./DynamicRenderer').then((module) => ({ default: module.DynamicRenderer }))
  );

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: responsive
      ? `repeat(auto-fit, minmax(300px, 1fr))`
      : `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
  };

  return (
    <div className="grid-component" style={gridStyle}>
      {children.map((child, index) => (
        <div key={child.id || index} className="grid-item">
          <React.Suspense fallback={<div>...</div>}>
            <DynamicRenderer schema={child} />
          </React.Suspense>
        </div>
      ))}
    </div>
  );
};

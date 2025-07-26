import React, { useState } from 'react';

const SHAPES = [
  { type: 'circle', label: '⭘' },
  { type: 'square', label: '◼' },
  { type: 'triangle', label: '▲' },
];

function Sidebar() {
  const [selected, setSelected] = useState(null);

  return (
    <aside className="sidebar">
      <div className="tools-list">
        {SHAPES.map((shape, idx) => (
          <div
            key={shape.type}
            className={`tool-item${selected === shape.type ? ' selected' : ''}`}
            draggable
            onDragStart={e => {
              e.dataTransfer.setData('shape', shape.type);
              setSelected(shape.type);
            }}
            onDragEnd={() => setSelected(null)}
            onClick={() => setSelected(shape.type)}
          >
            {shape.label}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;

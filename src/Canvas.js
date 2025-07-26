import React, { useRef, useState } from 'react';

const SHAPE_SIZE = 48;

function getShapeStyle(type, size) {
  switch (type) {
    case 'circle':
      return {
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#4f8cff',
      };
    case 'square':
      return {
        width: size,
        height: size,
        background: '#ffb84f',
      };
    case 'triangle':
      return {
        width: 0,
        height: 0,
        borderLeft: `${size/2}px solid transparent`,
        borderRight: `${size/2}px solid transparent`,
        borderBottom: `${size}px solid #4fff8c`,
        background: 'transparent',
      };
    default:
      return {};
  }
}

function Canvas({ shapes, setShapes }) {
  const canvasRef = useRef();
  const [draggedId, setDraggedId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState(null);

  // Handle drop from sidebar
  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('shape');
    if (!type) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - SHAPE_SIZE / 2;
    const y = e.clientY - rect.top - SHAPE_SIZE / 2;
    setShapes([...shapes, {
      id: Date.now() + Math.random(),
      type,
      x,
      y,
      size: SHAPE_SIZE,
    }]);
  };


  // Select shape on click
  const handleShapeClick = (id) => {
    setSelectedId(id);
  };

  // Remove shape by button
  const handleDeleteSelected = () => {
    if (selectedId !== null) {
      setShapes(shapes.filter(s => s.id !== selectedId));
      setSelectedId(null);
    }
  };

  // Start dragging shape
  const handleShapeMouseDown = (e, id) => {
    e.stopPropagation();
    setDraggedId(id);
    const shape = shapes.find(s => s.id === id);
    setDragOffset({
      x: e.clientX - shape.x,
      y: e.clientY - shape.y,
    });
    document.body.style.userSelect = 'none';
  };

  // Drag shape
  React.useEffect(() => {
    if (!draggedId) return;
    const handleMouseMove = (e) => {
      setShapes(shapes => shapes.map(s =>
        s.id === draggedId
          ? { ...s, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
          : s
      ));
    };
    const handleMouseUp = () => {
      setDraggedId(null);
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedId, dragOffset]);

  // Resize selected shape
  const handleSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setShapes(shapes => shapes.map(s =>
      s.id === selectedId
        ? { ...s, size: newSize }
        : s
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        className="canvas"
        ref={canvasRef}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        style={{ position: 'relative', width: 600, height: 400, background: '#f0f0f0', border: '2px solid #ccc', margin: '0 16px' }}
      >
        {shapes.map(shape => (
          <div
            key={shape.id}
            className={`canvas-shape${selectedId === shape.id ? ' selected' : ''}`}
            style={{
              position: 'absolute',
              left: shape.x,
              top: shape.y,
              cursor: draggedId === shape.id ? 'grabbing' : 'grab',
              boxShadow: selectedId === shape.id ? '0 0 0 2px #4f8cff' : '',
              ...getShapeStyle(shape.type, shape.size || SHAPE_SIZE),
            }}
            onClick={() => handleShapeClick(shape.id)}
            onMouseDown={e => handleShapeMouseDown(e, shape.id)}
            onDoubleClick={() => {
              setShapes(shapes.filter(s => s.id !== shape.id));
              if (selectedId === shape.id) setSelectedId(null);
            }}
          />
        ))}
      </div>
      <div style={{ width: 180, padding: 16, background: '#f8f8f8', borderLeft: '1px solid #ccc', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <label>Size:</label>
        <input
          type="range"
          min={24}
          max={200}
          value={selectedId !== null ? (shapes.find(s => s.id === selectedId)?.size || SHAPE_SIZE) : SHAPE_SIZE}
          onChange={handleSizeChange}
          style={{ width: '100%' }}
          disabled={selectedId === null}
        />
        <button
          style={{ marginTop: 12, background: '#ff4f4f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 4 }}
          onClick={handleDeleteSelected}
          disabled={selectedId === null}
        >Delete</button>
      </div>
    </div>
  );
}

export default Canvas;

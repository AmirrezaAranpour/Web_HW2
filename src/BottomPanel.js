import React from 'react';

function getCounts(shapes) {
  const counts = { circle: 0, square: 0, triangle: 0 };
  shapes.forEach(s => {
    if (counts[s.type] !== undefined) counts[s.type]++;
  });
  return counts;
}

function BottomPanel({ shapes }) {
  const counts = getCounts(shapes);
  return (
    <div className="bottom-panel" style={{ marginTop: 16, padding: 8, background: '#fff', borderTop: '1px solid #ccc', textAlign: 'center' }}>
      <span style={{ margin: '0 8px' }}>⭘ {counts.circle}</span>
      <span style={{ margin: '0 8px' }}>◼ {counts.square}</span>
      <span style={{ margin: '0 8px' }}>▲ {counts.triangle}</span>
    </div>
  );
}

export default BottomPanel;

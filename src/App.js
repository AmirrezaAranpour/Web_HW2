import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import BottomPanel from './BottomPanel';
import './App.css';

function App() {
  const [title, setTitle] = useState('Untitled Painting');
  const [shapes, setShapes] = useState([]); // {id, type, x, y}

  // Export canvas data as JSON
  const handleExport = () => {
    const data = JSON.stringify({ title, shapes });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'painting'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import canvas data from JSON
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setTitle(data.title || 'Untitled Painting');
        setShapes(data.shapes || []);
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app-container">
      <Header
        title={title}
        setTitle={setTitle}
        onExport={handleExport}
        onImport={handleImport}
      />
      <div className="main-content">
        <Sidebar />
        <Canvas
          shapes={shapes}
          setShapes={setShapes}
        />
      </div>
      <BottomPanel shapes={shapes} />
    </div>
  );
}

export default App;

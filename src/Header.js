import React, { useRef } from 'react';

function Header({ title, setTitle, onExport, onImport }) {
  const fileInputRef = useRef();

  return (
    <header className="header">
      <input
        className="title-input"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Painting Title"
      />
      <button className="export-btn" onClick={onExport}>Export</button>
      <button
        className="import-btn"
        onClick={() => fileInputRef.current.click()}
      >
        Import
      </button>
      <input
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={onImport}
      />
    </header>
  );
}

export default Header;

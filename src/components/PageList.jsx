import React, { useState } from 'react';
import VersionHistory from './VersionHistory';

const PageList = ({ book }) => {
  const [selectedPage, setSelectedPage] = useState(null);

  const pages = [];
  if (book.pages) pages.push(...book.pages);
  book.chapters.forEach(c => {
    if (c.pages) pages.push(...c.pages);
  });

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Pages</h3>
      <ul>
        {pages.map(p => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <button onClick={() => setSelectedPage(p)} style={{ marginLeft: '10px' }}>View Versions</button>
          </li>
        ))}
      </ul>
      {selectedPage && <VersionHistory page={selectedPage} />}
    </div>
  );
};

export default PageList;

import React, { useState } from 'react';
import axios from 'axios';

const PageForm = ({ book }) => {
  const [chapterId, setChapterId] = useState('');
  const [pageId, setPageId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');

  const chapters = book.chapters || [];

  const handleAddPage = async (e) => {
    e.preventDefault();
    if (!chapterId || !title || !username) return alert('Fill all required fields');

    try {
      const res = await axios.post(`http://localhost:5000/pages/${chapterId}`, { title, username });
      setPageId(res.data.id);
      setTitle('');
      alert('Page added!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditPage = async (e) => {
    e.preventDefault();
    if (!pageId || !content || !username) return alert('Fill all required fields');

    try {
      await axios.put(`http://localhost:5000/pages/${pageId}`, { content, username });
      setContent('');
      alert('Page updated with new version!');
    } catch (err) {
      console.error(err);
    }
  };

  const inputStyle = { padding: '6px', marginBottom: '8px', width: '100%', maxWidth: '400px', borderRadius: '4px', border: '1px solid #ccc' };
  const buttonStyle = { padding: '6px 12px', marginRight: '8px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ color: '#34495e' }}>Add / Edit Page</h3>
      <input type="text" placeholder="Your Name" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} />
      <select value={chapterId} onChange={e => setChapterId(e.target.value)} style={{ ...inputStyle, width: '200px' }}>
        <option value="">Select Chapter</option>
        {chapters.map(c => (<option key={c.id} value={c.id}>{c.title}</option>))}
      </select>
      <input type="text" placeholder="Page Title" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
      <textarea placeholder="Page Content" value={content} onChange={e => setContent(e.target.value)} rows={4} style={inputStyle} />
      <div>
        <button onClick={handleAddPage} style={buttonStyle}>Add Page</button>
        <button onClick={handleEditPage} style={buttonStyle}>Save Content</button>
      </div>
    </div>
  );
};

export default PageForm;

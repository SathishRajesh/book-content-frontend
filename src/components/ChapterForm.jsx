import React, { useState } from 'react';
import axios from 'axios';

const ChapterForm = ({ book }) => {
  const [title, setTitle] = useState('');
  const [order, setOrder] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !order) return alert('Please fill all fields');

    try {
      await axios.post(`http://localhost:5000/chapters/${book.id}`, { title, order: parseInt(order) });
      setTitle('');
      setOrder('');
      alert('Chapter added successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  const inputStyle = { marginRight: '10px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' };
  const buttonStyle = { padding: '6px 12px', backgroundColor: '#2980b9', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h3 style={{ color: '#34495e' }}>Add Chapter to "{book.title}"</h3>
      <input type="text" placeholder="Chapter Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} required />
      <input type="number" placeholder="Order" value={order} onChange={(e) => setOrder(e.target.value)} style={inputStyle} required />
      <button type="submit" style={buttonStyle}>Add Chapter</button>
    </form>
  );
};

export default ChapterForm;

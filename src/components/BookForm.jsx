import React, { useState } from 'react';
import axios from 'axios';

const BookForm = ({ fetchBooks }) => {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numPages, setNumPages] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !title || !description) return alert('Please fill all required fields');

    try {
      await axios.post(`${API_URL}/books`, { title, description, numPages, username });
      setUsername('');
      setTitle('');
      setDescription('');
      setNumPages(0);
      fetchBooks();
      alert('Book created successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  const inputStyle = { display: 'block', marginBottom: '10px', padding: '8px', width: '100%', maxWidth: '400px', borderRadius: '5px', border: '1px solid #ccc' };
  const buttonStyle = { padding: '8px 15px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2 style={{ color: '#2c3e50' }}>Create Book</h2>
      <input type="text" placeholder="Your Name" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} required />
      <input type="text" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} required />
      <input type="text" placeholder="Book Description" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} required />
      <input type="number" placeholder="Number of Pages" value={numPages} onChange={(e) => setNumPages(e.target.value)} style={inputStyle} />
      <button type="submit" style={buttonStyle}>Create Book</button>
    </form>
  );
};

export default BookForm;

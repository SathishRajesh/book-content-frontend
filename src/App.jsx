import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import ChapterForm from './components/ChapterForm';
import PageForm from './components/PageForm';
import PageList from './components/PageList';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Mini Book CMS</h1>
      <BookForm fetchBooks={fetchBooks} />
      <hr style={{ margin: '30px 0' }} />
      
      <h2 style={{ color: '#34495e' }}>Books</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {books.map(book => (
          <li key={book.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <strong style={{ marginRight: '10px' }}>{book.title}</strong>
            <button 
              style={{ padding: '5px 10px', backgroundColor: '#2980b9', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              onClick={() => setSelectedBook(book)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>

      {selectedBook && (
        <div style={{ marginTop: '20px' }}>
          <ChapterForm book={selectedBook} />
          <PageForm book={selectedBook} />
          <PageList book={selectedBook} />
        </div>
      )}
    </div>
  );
}

export default App;

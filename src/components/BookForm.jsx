import { useEffect, useState } from 'react';
import axios from 'axios';
import ChapterForm from './ChapterForm';
import '../App'
const BookForm = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/books');
    setBooks(res.data || []);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const submit = async () => {
    if (!title || !description || !username) {
      return alert('Fill all fields');
    }

    await axios.post('http://localhost:5000/books', {
      title,
      description,
      username
    });

    setTitle('');
    setDescription('');
    setUsername('');
    fetchBooks();
  };

  return (
    <div className="container">
      <div>
        <h2  style={{display:"flex"}}>Create Book</h2>
        <div className="form">
          <input
            placeholder="Book Name"
            value={title}
            onChange={e => setTitle(e?.target?.value)}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e?.target?.value)}
          />

          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e?.target?.value)}
          />

          <button onClick={submit}>Create Book</button>
        </div>

        <div className="book-list">
                  <h2 style={{display:"flex"}}>Books</h2>
          {books?.map(b => (
            <div key={b?.id} className="book-item">
              {b?.title}
            </div>
          ))}
        </div>

        {books?.length > 0 && (
          <ChapterForm books={books} refresh={fetchBooks} />
        )}
      </div>
    </div>
  );
};

export default BookForm;

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PageForm({ chapter,refresh }) {
  const [chapterId, setChapterId] = useState(chapter?.id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');

  const createPage = async () => {
    if (!chapterId || !title || !content || !username) {
      return alert('Fill all fields');
    }

    await axios.post(
      `http://localhost:5000/pages/${chapterId}`,
      { title,username,content }
    );

    setTitle('');
    setContent('');
    setUsername('')
    refresh();
  };

  return (
    <>
      <h3>Create Page</h3>

      <input
        placeholder="Page Title"
        value={title}
        onChange={e => setTitle(e?.target?.value)}
      />
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e?.target?.value)}
      />

      <textarea
        placeholder="Page Content"
        value={content}
        onChange={e => setContent(e?.target?.value)}
        rows={4}
      />

      <button onClick={createPage}>Create Page</button>
    </>
  );
}

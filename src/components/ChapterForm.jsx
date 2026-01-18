import { useState } from 'react';
import axios from 'axios';
import PageForm from './PageForm';
import PageList from './PageList';

const  ChapterForm=({ books, refresh })=>{
  const [selectedBookId, setSelectedBookId] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');

  const selectedBook = books.find(b => b.id === selectedBookId);
  const selectedChapter = selectedBook?.chapters?.find(
    ch => ch.id === selectedChapterId
  );

  const createChapter = async () => {
    if (!selectedBookId || !chapterTitle) {
      return alert('Select book and enter chapter name');
    }

    const res = await axios.post(
      `http://localhost:5000/chapters/${selectedBookId}`,
      { title: chapterTitle }
    );

    refresh();

    const newChapter = res?.data?.chapters?.at(-1);
    setSelectedChapterId(newChapter?.id);
    setChapterTitle('');
  };    

  return (
    <>
      <h3  style={{display:"flex"}}>Create Chapter</h3>

      <select
        value={selectedBookId}
        onChange={e => {
          setSelectedBookId(e?.target?.value);
          setSelectedChapterId('');
        }}
      >
        <option value="">Select Book</option>
        {books?.map(book => (
          <option key={book?.id} value={book?.id}>
            {book?.title}
          </option>
        ))}
      </select>

      <input
        placeholder="Chapter Name"
        value={chapterTitle}
        onChange={e => setChapterTitle(e?.target?.value)}
      />

      <button onClick={createChapter}>Create Chapter</button>

     {selectedBook && (
  <>
    <h4>Chapters in Book of {selectedBook?.title}</h4>

    {selectedBook?.chapters?.length === 0 ? (
      <p style={{ color: '#888' }}>No chapters found in {selectedBook?.title}</p>
    ) : (
      selectedBook?.chapters?.map(ch => (
        <button
          key={ch?.id}
          onClick={() => setSelectedChapterId(ch?.id)}
          style={{ marginRight: '6px' }}
        >
          {ch?.title}
        </button>
      ))
    )}
  </>
)}


      {selectedChapter && (
        <>
          <PageForm chapter={selectedChapter} refresh={refresh} />
          <PageList chapter={selectedChapter} />
        </>
      )}
    </>
  );
}
export default ChapterForm
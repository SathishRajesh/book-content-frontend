import axios from 'axios';
import VersionList from './VersionList'


export default function PageList({ chapter, refresh }) {
  if (!chapter) return null;

  const restore = async (index) => {
    await axios.post(
      `http://localhost:5000/pages/${chapter.id}/restore/${index}`
    );
    refresh();
  };
console.log(chapter)
  return (
    <>
      <h4>Pages</h4>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
             <th>Username</th>
            <th>Restore</th>
          </tr>
        </thead>
        <tbody>
          {chapter?.pages?.map((p, i) => (
            <tr key={p?.id}>
              <td>{i + 1}</td>
              <td>{p?.title}</td>
              <td>{p?.username}</td>
              <td>
                {i < chapter?.pages?.length - 1 && (
                  <button onClick={() => restore(i)}>Restore</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <VersionList chapter={chapter} />
    </>
  );
}

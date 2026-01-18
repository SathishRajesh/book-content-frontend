export default function VersionList({ chapter }) {
  if (!chapter?.versions?.length) return null;

  return (
    <>
      <h4>Versions </h4>
      {chapter?.versions?.map((v, i) => (
        <div
          key={i}
          style={{ border: '1px solid #ccc', margin: 6, padding: 6 }}
        >
          <b>Version:</b> {v?.version}<br />
          <b>Page:</b> {v?.pageId}<br />
          <b>User:</b> {v?.username}<br />
          <pre>{v?.content}</pre>
        </div>
      ))}
    </>
  );
}

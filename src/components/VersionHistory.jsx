import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VersionHistory = ({ page }) => {
  const [versions, setVersions] = useState([]);
const API_URL = import.meta.env.VITE_API_URL

  const fetchVersions = async () => {
    try {
      const res = await axios.get(`${API_URL}/pages/${page.id}/versions`);
      setVersions(res.data);
    } catch (err) {
        console.log(err)
      console.error(err?.response?.data?.message);
      alert(`No data found`);
    }
  };

  useEffect(() => {
    fetchVersions();
  }, [page]);

  const handleRestore = async (versionNumber) => {
    try {
      await axios.post(`${API_URL}/pages/${page.id}/restore`, {
        versionNumber,
      });
      alert(`Restored version ${versionNumber}`);
      fetchVersions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <h4>Version History: {page.title}</h4>
      <ul>
        {versions.map(v => (
          <li key={v.version}>
            Version: {v.version}, Editor: {v.editor}, Time: {new Date(v.timestamp).toLocaleString()}
            <button onClick={() => handleRestore(v.version)} style={{ marginLeft: '10px' }}>Restore</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VersionHistory;

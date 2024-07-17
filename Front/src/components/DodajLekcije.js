import React, { useState } from 'react';
import axios from 'axios';
import './DodajLekcije.css'; 

const DodajLekcije = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Niste odabrali fajl za upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const response = await axios.post('https://localhost:5000/Projekat/UploadGramatikaFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);

      setMessage('Fajl uspešno uploadovan.');
      console.log(response.data);
    } catch (error) {
      setMessage('Greška prilikom uploada fajla.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload">
      <h2>Dodaj Lekcije</h2>
      <div className="file-upload">
        <input type="file" onChange={handleFileChange} />
        <button className="upload-but" onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DodajLekcije;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gramatika.css';

const Gramatika9 = () => {
  const [fileUrls, setFileUrls] = useState([]);
  const ids = [11, 12]; 

  useEffect(() => {
    const fetchPdfFiles = async () => {
      const urls = [];
      for (const id of ids) {
        try {
          const response = await axios.get(`https://localhost:5000/Projekat/DownloadGramatikaFile/${id}`, {
            responseType: 'blob' 
          });
          console.log(response);
          const file = new Blob([response.data], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          urls.push(fileURL);
        } catch (error) {
          console.error('Error fetching PDF file:', error);
        }
      }
      setFileUrls(urls);
    };

    fetchPdfFiles();
  }, []);

  return (
    <div className="gramatika-container">
      {fileUrls.length > 0 ? (
        fileUrls.map((fileUrl, index) => (
          <div className="pdf-viewer" key={index}>
            <iframe src={fileUrl} width="100%" height="600" title={`PDF Viewer ${index + 1}`} />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Gramatika9;

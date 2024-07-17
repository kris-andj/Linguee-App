import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gramatika.css';
import './PdfViewer.js';


const Gramatika2 = () => {
    const [fileUrl, setFileUrl] = useState('');
    const id = 7;

    useEffect(() => {
        const fetchPdfFile = async () => {
            try {
                const response = await axios.get(`https://localhost:5000/Projekat/DownloadGramatikaFile/${id}`, {
                    responseType: 'blob' 
                });
                console.log(response)
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                setFileUrl(fileURL);
            } catch (error) {
                console.error('Error fetching PDF file:', error);
            }
        };

        fetchPdfFile();
    }, []);

    return (
        <div className="gramatika-container">
            <div className="pdf-viewer">
                {fileUrl && (
                    <iframe src={fileUrl} width="100%" height="600" title="PDF Viewer" />
                )}
            </div>
        </div>
    );
};

export default Gramatika2;

import React, { useState } from 'react';
import axios from 'axios';

const PDFViewer = () => {
    const [fileContent, setFileContent] = useState('');

    const fetchPDF = async () => {
        try {
            const response = await axios.get('https://localhost:5000/Projekat/DownloadGramatikaFile/1', {
                responseType: 'blob' // binarni podaci
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setFileContent(url);
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
    };

    return (
        <div>
            <button onClick={fetchPDF}>Prikaži PDF</button>
            {fileContent && <iframe title="PDF Viewer" src={fileContent} width="100%" height="600px"></iframe>}
        </div>
    );
};

export default PDFViewer;

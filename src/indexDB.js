import React, { useState, useEffect } from 'react';
import { setEnvironmentContext, getStore, listStores } from "@netlify/blobs";
// Constants for IndexedDB configuration
const DB_NAME = "BlobDatabase";
const STORE_NAME = "blobStore";
const DB_VERSION = 1;
let db;

const IndexedDBBlob = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [downloadLink, setDownloadLink] = useState(null);

    // Initialize IndexedDB
  
    const sampleData = getStore("demo")
    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Store the selected file in IndexedDB
    const storeBlob = async () => {
        await sampleData.set("demo",selectedFile );
    };

    // Retrieve the stored blob from IndexedDB and create a download link
    const retrieveBlob = async () => {
        const data = await sampleData.set("demo");
        console.log('data', data)
    };

    return (
        <div>
            <h2>IndexedDB Blob Storage Example</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={storeBlob}>upload File</button>
            <button onClick={retrieveBlob}>Retrieve File</button>

            {downloadLink && (
                <div>
                    <a href={downloadLink.url} download={downloadLink.name}>
                        Download Stored File ({downloadLink.name})
                    </a>
                </div>
            )}
        </div>
    );
};

export default IndexedDBBlob;

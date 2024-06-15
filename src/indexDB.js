import React, { useState, useEffect } from 'react';
import { setEnvironmentContext, getStore, listStores } from "@netlify/blobs";
import { getDeployStore } from "@netlify/blobs";
// Constants for IndexedDB configuration
const DB_NAME = "BlobDatabase";
const STORE_NAME = "blobStore";
const DB_VERSION = 1;
let db;

const IndexedDBBlob = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [downloadLink, setDownloadLink] = useState(null);

    const store = getDeployStore({
        siteID: process.env.siteID,
        token: process.env.token,
        deployID : process.env.deployID
      });
      const { blobs } = store.list();
      console.log('blobs', blobs)
    // const store = getStore({ siteID: 'de897f5a-f03e-44e3-9d71-2f6c2c55a40c', token: 'nfp_DxkBw4dXtypyurZtwcTUt1oCH8UrK5SU76ad', name: 'foo' });
    console.log('store', store)
      const getList = async () => {
        const { blobs } = await store.list();  
        console.log('blobs', blobs)
      }
      getList()
    // Initialize IndexedDB
  
    // const sampleData = getStore("demo")
    // Handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

     
    // // Store the selected file in IndexedDB
    const storeBlob = async () => {
        await store.setJSON("nails", { type: "common", finish: "bright" });
    };

    // // Retrieve the stored blob from IndexedDB and create a download link
    // const retrieveBlob = async () => {
    //     const data = await sampleData.set("demo");
    //     console.log('data', data)
    // };

    return (
        <div>
            <h2>IndexedDB Blob Storage Example</h2>
             <input type="file" onChange={handleFileChange} />
             <button onClick={storeBlob}>upload File</button>
            {/* <button onClick={retrieveBlob}>Retrieve File</button>   */}

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

// imports
import React, { useState, useRef } from 'react';
import "./FileUpload.scss"

// prop interface
interface props {
  onFileUpload: (file: File) => void; // Callback to handle the uploaded file
}

const FileUpload: React.FC<props> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // manage file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      onFileUpload(file); // manage file upload
    }
  };

  // click actual input when mask is clicked
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically trigger the file input click
    }
  };

  return (
    <div>
      <div className="customUploadButton" onClick={handleButtonClick}>Upload</div>
      <input 
        type="file" 
        className={"hiddenFileInput"} 
        ref={fileInputRef} 
        onChange={handleFileChange}/>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default FileUpload;
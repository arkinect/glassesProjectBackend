// imports
import React, { useState } from 'react';
import "./FileUpload.scss"

// prop interface
interface props {
  onFileUpload: (file: File) => void; // Callback to handle the uploaded file
}

const FileUpload: React.FC<props> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      onFileUpload(file); // manage file upload
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default FileUpload;

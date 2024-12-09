// imports
import React, { useState, useRef } from 'react';
import "./FileUpload.scss"

// prop interface
interface props {
  onFileUpload: (files: File[]) => void; // Callback to handle the uploaded file
}

const FileUpload: React.FC<props> = ({ onFileUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // manage file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const addedfiles = Array.from(event.target.files);
      const files = [...selectedFiles, ...addedfiles];
      setSelectedFiles(files);
      onFileUpload(files); // manage file upload
      
      // Generate preview URLs
      const urls = files.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // Read the file as a data URL
        return new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
        });
      });

      // Resolve all promises and set preview URLs
      Promise.all(urls).then(setPreviewUrls);
    }
  };

  // manage file removal
  const handleRemoveImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedPreviews);
    onFileUpload(updatedFiles); // Update the parent with the new file list
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
      <div className='flexbox_imageUpload'>
        <div className='flexbox_internal'>
          <div className="customUploadButton" onClick={handleButtonClick}>Upload</div>
          <input 
            type="file" 
            className={"hiddenFileInput"} 
            ref={fileInputRef} 
            multiple
            onChange={handleFileChange}/>
        </div>
        <div className="flexbox_internal">
          {previewUrls.length > 0 && (
            <div className="imagePreviewContainer">
              {previewUrls.map((url, index) => (
                <div key={index} className="imagePreviewWrapper">
                  <img src={url} alt={`Preview ${index + 1}`} className="imagePreview" />
                  <button className="removeButton" onClick={() => handleRemoveImage(index)}>X</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
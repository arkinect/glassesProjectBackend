// imports
import React from 'react';
import './PageStylings.scss';
import SiteHeader from '../components/SiteHeader';
import FileUpload from '../components/primitives/FileUpload';

// prop interface
interface props {
}

// class
const ProfilePage: React.FC<props> = ({}) => {

  const handleFileUpload = (file: File) => {
    console.log("File uploaded:", file);
    // handle save to db or something here
  };

  return (
      <div>
      <header>
        <SiteHeader></SiteHeader>
      </header>
      <main>
        <div className={"spacing_page_margins"}> {/* page margins  */}
            This is the profile page
            <FileUpload onFileUpload={handleFileUpload}></FileUpload>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

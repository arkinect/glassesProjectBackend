// imports
import React from 'react';
import './PageStylings.scss';
import SiteHeader from '../components/SiteHeader';
import FileUpload from '../components/primitives/FileUpload';
import PrimaryButton from '../components/primitives/PrimaryButton';
import { useAuth0 } from "@auth0/auth0-react";

// prop interface
interface props {
}


// class
const ProfilePage: React.FC<props> = ({}) => {

  const { logout } = useAuth0();

  const handleLogout = () => {
    sessionStorage.clear();
    document.cookie.split(';').forEach((cookie) => {
      const cookieName = cookie.split('=')[0];
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const handleFileUpload = (files: File[]) => {
    console.log("File uploaded:", files);
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
            <PrimaryButton text='Logout' handleClick={handleLogout}></PrimaryButton>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

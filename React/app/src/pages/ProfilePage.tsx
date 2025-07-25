// imports
import React from 'react';
import './PageStylings.scss';
import SiteHeader from '../components/SiteHeader';
import PrimaryButton from '../components/primitives/PrimaryButton';
import { useAuth } from '../components/auth/AuthProvider';

// prop interface
interface props {
}


// class
const ProfilePage: React.FC<props> = ({}) => {

  const { logout } = useAuth();
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
            <PrimaryButton text='Logout' handleClick={logout}></PrimaryButton>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

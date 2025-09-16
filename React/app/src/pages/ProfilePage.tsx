// imports
import React from 'react';
import './PageStylings.scss';
import SiteHeader from '../components/SiteHeader';
import PrimaryButton from '../components/primitives/PrimaryButton';
import { useAuth } from '../components/auth/AuthProvider';
import DefaultInfoForm from '../components/DefaultInfoForm';

// prop interface
interface props {
}


// class
const ProfilePage: React.FC<props> = ({}) => {

  const { logout } = useAuth();

  return (
      <div>
      <header>
        <SiteHeader></SiteHeader>
      </header>
      <main>
        <div className={"spacing_page_margins"}> {/* page margins  */}
          <DefaultInfoForm></DefaultInfoForm>
          <div className='spacing'></div>
          <PrimaryButton text='Logout' handleClick={logout}></PrimaryButton>  
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

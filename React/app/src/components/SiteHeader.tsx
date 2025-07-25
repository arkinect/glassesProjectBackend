// imports
import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './SiteHeader.scss'
import LinkButton from './primitives/LinkButton';
import PrimaryButton from './primitives/PrimaryButton';
import { BackendURL } from '..';
import { useAuth } from './auth/AuthProvider';

// prop interface
interface props {
}

// class
const SiteHeader: React.FC<props> = ({}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 

  const navToMarket = () => {
      navigate('/market'); 
  };

  const navToProfile = () => {
      navigate('/profile'); 
  };

  const navToNewListing = () => {
    navigate('/newListing'); 
  };

  const handleLogin = () => {
    window.location.href = `${BackendURL}/auth/login`;
  };

  return (
    <div className={"header_frame flexbox_header"}>
      <div className={"flexbox_internal"}> {/*Left group*/}
        <img src='' className={"logo_placeholder"}></img> {/*This will become some kind of logo*/}
        <div className={"font_website_title"}>Website name</div>
      </div>

      {/*Right group*/}
      {isAuthenticated? (
        <div className={"flexbox_internal"}> 
          <LinkButton text='Market' handleClick={navToMarket}></LinkButton>
          <div className='buffer_horizontal'></div>
          <LinkButton text='New Post' handleClick={navToNewListing}></LinkButton>
          <div className='buffer_horizontal'></div>
          <LinkButton text='Profile' handleClick={navToProfile}></LinkButton>
        </div> 
      ):(
        <div className={"flexbox_internal"}>
          <LinkButton text='Market' handleClick={navToMarket}></LinkButton>
          <div className='buffer_horizontal'></div>
          <PrimaryButton text='Log In' handleClick={handleLogin}></PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default SiteHeader;

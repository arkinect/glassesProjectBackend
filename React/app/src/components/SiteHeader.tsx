// imports
import React from 'react';
import {useNavigate } from 'react-router-dom';
import './SiteHeader.scss'
import LinkButton from './primitives/LinkButton';

// prop interface
interface props {
}

// class
const SiteHeader: React.FC<props> = ({}) => {
  const navigate = useNavigate();

  const navToMarket = () => {
      navigate('/market'); 
  };

  const navToProfile = () => {
      navigate('/profile'); 
  };

  const navToNewListing = () => {
    navigate('/newListing'); 
  };

  return (
      <div className={"header_frame flexbox_header"}>
      <div className={"flexbox_internal"}> {/*Left group*/}
        <img src='' className={"logo_placeholder"}></img> {/*This will become some kind of logo*/}
        <div className={"font_website_title"}>Website name</div>
      </div>

      <div className={"flexbox_internal"}> {/*Right group*/}
        <LinkButton text='New Post' handleClick={navToNewListing}></LinkButton>
        <div className='buffer_horizontal'></div>
        <LinkButton text='Market' handleClick={navToMarket}></LinkButton>
        <div className='buffer_horizontal'></div>
        <LinkButton text='Profile' handleClick={navToProfile}></LinkButton>
      </div> 
    </div>
  );
  };

export default SiteHeader;

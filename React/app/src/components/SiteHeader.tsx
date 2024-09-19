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

  return (
      <div className={"header-frame flexbox"}>
      <div className={"flexbox-internal"}> {/*Left group*/}
        <img src='' className={"logo-placeholder"}></img> {/*This will become some kind of logo*/}
        <div className={"font-website-title"}>Website name</div>
      </div>

      <div className={"flexbox-internal"}> {/*Right group*/}
          <LinkButton text='Market' handleClick={navToMarket}></LinkButton>
          <LinkButton text='Profile' handleClick={navToProfile}></LinkButton>
      </div> 
    </div>
  );
  };

export default SiteHeader;

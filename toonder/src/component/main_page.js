import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./mainPage.css";
import MainBackgorund from './mainBackground';

function Mainpage() {
  const navigate = useNavigate();

  return (
    <MainBackgorund>
      <div className='mainPage'>
      </div>
    </MainBackgorund>
  );
}

export default Mainpage;
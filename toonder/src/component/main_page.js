import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logoimage.png';
import "../style.css";
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

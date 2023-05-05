import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./mainPage.css";
import MainBackgorund from './mainBackground';
import ex1 from "../images/ex1.png"


function Mypage() {
  const navigate = useNavigate();

  return (
    <MainBackgorund>
        <div className='mainUserInfo'>

        </div>
    </MainBackgorund>
  );
}

export default Mypage;
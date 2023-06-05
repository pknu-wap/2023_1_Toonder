import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logoimage.png';
import './backGround.module.css';
import axios from 'axios';

function MainBackgorund(props) {
  const navigate = useNavigate();
  const [loggedUserName, setLoggedUserName] = useState('지금 로그인하세요!');

  return (
    <div className="mainPageBack">
      <article>
        <div className="logoSearch">
          <div className="mainLogo">
            <button
              id="main_page"
              onClick={() => {
                navigate('/main_page');
              }}
            >
              <img src={logo} width="84px" height="93px" alt="image error" />
              <h1>Toonder</h1>
            </button>
          </div>
          <div className="mainSearch">
            <input
              id="mainSearchInput"
              type="text"
              placeholder="    찾고싶은 웹툰 검색!"
            />
            <button id="mainSearchButton">검색</button>
          </div>
        </div>
        {props.children}
      </article>
      <footer className="footer"> {/* 수정 */}
      </footer>
    </div>
  );
}

export default MainBackgorund;

  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import logo from '../../images/logoimage.png';
  import './backGround.module.css';
  import axios from 'axios';

  function MainBackgorund(props) {
    const navigate = useNavigate();
    const [loggedUserName, setLoggedUserName] = useState('지금 로그인하세요!');
    const [webtoontitle, setWebtoontitle] = useState('');

    const handleSearch = () => {
      navigate(`/webtoonsearch?title=${webtoontitle}`);
    };

    return (
      <div className="mainPageBack">
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
            placeholder="찾고싶은 웹툰 검색!"
            value={webtoontitle}
            onChange={(e) => setWebtoontitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button id="mainSearchButton" onClick={handleSearch}>
            검색
          </button>
        </div>
        </div>
        {props.children}
      </div>
    );
  }

  export default MainBackgorund;

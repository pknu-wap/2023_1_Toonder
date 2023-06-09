import React, { useState, useEffect, useRef} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../images/logoimage.png';
import './backGround.module.css';
import axios from 'axios';

function MainBackgorund(props) {
  const inputRef = useRef(null);
  
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState('');
  const handleInputChange = (event) => {
    setSearchContent(event.target.value);
  };


  return (
    <div className="mainPageBack">
      <div className="logoSearch">
        {' '}
        {/* 좌우구분용 네브 */}
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
          <div className="mainSearch" style={{marginLeft:'5px',height:'60%',width:'87%',backgroundColor:'white', }}>
            <input
              ref={inputRef}
              id="mainSearchInput"
              type="text"
              placeholder="찾고싶은 웹툰 제목 검색!"
              value={searchContent}
              onChange={handleInputChange}
              style={{height:'100%'}}
            />
          </div>
          
          <button
            id="mainSearchButton"
            onClick={() => {
              navigate('/search', {
                state: { searchContent: searchContent },
              });
            }}
          >
            검색
          </button>
          
        </div>
      </div>
      {props.children} {/* props.children 렌더링 */}
    </div>
  );
}

export default MainBackgorund;

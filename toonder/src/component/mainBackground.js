import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logoimage.png';
import "./mainPage.css";

function MainBackgorund() {
  const navigate = useNavigate();

  return (
    <div className='mainPage'>
        <div className='mainLogo'>
            <img src={logo} width="84px" height="93px" alt="image error" /><h1>Toonder</h1>
        </div>
        <div className='mainSearch'>
            <input id="mainSearchInput" type="text" placeholder="찾고싶은 웹툰 검색!" />
            <button id="mainSearchButton">검색</button>
        </div>
        <div className='mainInfo'>
            <img></img>
            <h2>이름</h2>
            <button id='changeInfo'><h3>정보수정</h3></button>
        </div>
        <div className='mainButtonSet'>
                <button id="webtoonList">웹툰 목록</button>
                <button id="mypage">마이페이지</button>
                <button id="freeBoard">자유게시판</button>
                <button id="logOut">로그아웃</button>
        </div>
    </div>
  );
}
export default MainBackgorund;

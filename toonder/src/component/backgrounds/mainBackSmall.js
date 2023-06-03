import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './backGround.module.css';
import ex1 from '../../images/ex1.png';
import axios from 'axios';
import supabase from '../supabase';

function MainBackSmall(props) {
  const navigate = useNavigate();

  return (
    <div className="mainBackSmall">
      <Link to="/infochange">
        <div className="mainInfo">
          <Link to="/profilechange">
            <img id="infoimg" src={ex1} alt="image error"></img>
          </Link>
          <h2>{props.loggedUserName}</h2>
          <button
            id="changeInfo"
            onClick={() => localStorage.removeItem('loggedUserName')}
          >
            <h3>정보수정</h3>
          </button>
        </div>
      </Link>
      <div className="mainButtonSet">
        <button
          id="webtoonList"
          onClick={() => {
            navigate('/mainWebtoonList');
          }}
        >
          웹툰 목록
        </button>
        <button
          id="mypage"
          onClick={() => {
            navigate('/mypage');
          }}
        >
          마이페이지
        </button>
        <button
          id="freeBoard"
          onClick={() => {
            navigate('/freeboard');
          }}
        >
          자유게시판
        </button>
        <button
          id="logOut"
          onClick={() => {
            navigate('/');
          }}
        >
          로그아웃
        </button>
        {/*로그아웃 시 세션 만료했음을 나타내는 기능 필요함 */}
      </div>
      {props.children} {/* props.children 렌더링 */}
    </div>
  );
}
export default MainBackSmall;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './backGround.module.css';
import axios from 'axios';
import ex1 from '../../images/ex1.png';

function MainBackSmall(props) {
  const navigate = useNavigate();
  const [loggedUserName, setLoggedUserName] = useState('지금 로그인하세요!');
  useEffect(() => {
    axios
      .get('api/member/select/' + sessionStorage.getItem('loggedUserEmail'))
      .then((loggedUserData) => {
        setLoggedUserName(loggedUserData.data.mem_name);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='mainBackSmall'>
        <Link to='/mypage'>
          <div className='mainInfo'>
            <Link to='/profilechange'>
              <img id='infoimg' src={ex1} alt="image error"></img>
            </Link>
            <h2>{loggedUserName}</h2>
            <button id='changeInfo'
            onClick={() => {
              navigate('/check_password');
            }}
            ><h3>정보수정</h3></button>
          </div>
        </Link>

        <div className='mainButtonSet'>
        <button id="webtoonList"
        onClick={() => {
          navigate('/mainWebtoonList');
        }}
        >웹툰 목록</button>
        <button id="mypage"
          onClick={() => {
            navigate('/mypage');
          }}
        >마이페이지</button>
        <button id="freeBoard"
          onClick={() => {
            navigate('/freeboard');
          }}
        >자유게시판</button>
        <button id="logOut"
        onClick={() => {
          navigate('/');
        }}
        >로그아웃</button>{/*로그아웃 시 세션 만료했음을 나타내는 기능 필요함 */}
      </div>
      {props.children} {/* props.children 렌더링 */}
    </div>
  );
}
export default MainBackSmall;

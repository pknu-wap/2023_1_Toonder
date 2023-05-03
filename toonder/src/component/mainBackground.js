import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logoimage.png';
import "./mainPage.css";

function MainBackgorund(props) {
  const navigate = useNavigate();

  return (
    <div className='mainPageBack'>
      <nav className='sidePart'> {/* 좌우구분용 네브 */}
        <div className='mainLogo'>
          <button id="main_page"
            onClick={() => {
              navigate('/main_page');
            }}>
            <img src={logo} width="84px" height="93px" alt="image error" /><h1>Toonder</h1>
          </button>
        </div>
        <div className='mainInfo'>
          <img></img>
          <h2>이름</h2>
          <button id='changeInfo'><h3>정보수정</h3></button>
        </div>
        <div className='mainButtonSet'>
          <button id="webtoonList"
          onClick={() => {
            navigate('/mainWebtoonList');
          }}
          >웹툰 목록</button>
          <button id="mypage"
            onClick={() => {
              navigate('/mainBackSmall');
            }}
          >마이페이지</button>
          <button id="freeBoard">자유게시판</button>
          <button id="logOut"
          onClick={() => {
            navigate('/');
          }}
          >로그아웃</button>{/*로그아웃 시 세션 만료했음을 나타내는 기능 필요함 */}
        </div>
      </nav>
      <section className='mainPart'>{/* 좌우 구분용 섹션 */}
        <div className='mainSearch'>
          <input id="mainSearchInput" type="text" placeholder="    찾고싶은 웹툰 검색!" />
          <button id="mainSearchButton">검색</button>
        </div>
        {props.children} {/* props.children 렌더링 */}
      </section>
    </div>

  );
}
export default MainBackgorund;

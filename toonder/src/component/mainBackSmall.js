import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logoimage.png';
import "./mainPage.css";

function MainBacksmall(props) {
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
export default MainBacksmall;

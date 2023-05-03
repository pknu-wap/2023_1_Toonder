import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logoimage.png';
import "./mainPage.css";
import axios from 'axios';

function MainBackgorund(props) {
  const navigate = useNavigate();
  const [loggedUserName, setLoggedUserName] = useState('지금 로그인하세요!');
  useEffect(() => {
    axios
      .get('api/member/select/'+sessionStorage.getItem('loggedUserEmail'))
      .then(loggedUserData => {
        setLoggedUserName(loggedUserData.data.mem_name);
      })
      .catch(error => console.log(error))
  },[])

  return (
    <div className='mainPageBack'>
      <nav> {/* 좌우구분용 네브 */}
        <div className='mainLogo'>
          <img src={logo} width="84px" height="93px" alt="image error" /><h1>Toonder</h1>
        </div>
        <div className='mainInfo'>
          <img></img>
          <h2>{loggedUserName}</h2>
          <button id='changeInfo'><h3>정보수정</h3></button>
        </div>
        <div className='mainButtonSet'>
          <button id="webtoonList">웹툰 목록</button>
          <button id="mypage">마이페이지</button>
          <button id="freeBoard">자유게시판</button>
          <button id="logOut">로그아웃</button>
        </div>
      </nav>
      <section>{/* 좌우 구분용 섹션 */}
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

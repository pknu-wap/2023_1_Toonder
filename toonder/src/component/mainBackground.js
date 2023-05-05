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
      <div className='logoSearch'> {/* 좌우구분용 네브 */}
        <div className='mainLogo'>
          <button id="main_page"
            onClick={() => {
              navigate('/main_page');
            }}>
            <img src={logo} width="84px" height="93px" alt="image error" /><h1>Toonder</h1>
          </button>
        </div>
        <div className='mainSearch'>
          <input id="mainSearchInput" type="text" placeholder="    찾고싶은 웹툰 검색!" />
          <button id="mainSearchButton">검색</button>
        </div>
      </div>
        {props.children} {/* props.children 렌더링 */}
    </div>

  );
}
export default MainBackgorund;

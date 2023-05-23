import React,{useState, useEffect} from 'react';
import { useNavigate , Link} from 'react-router-dom';
import "./freeboard.css";
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';


function Freeboard() {
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
    <MainBackgorund>
        <div className='mainboard'>
            <h2>자유게시판</h2>
            <ul>
              <li>
                <Link to='/postview'>1234</Link>
              </li>
              <li>
                <Link to='/postview'>1234</Link>
              </li>
              <li>
                <Link to='/postview'>1234</Link>
              </li>
              <li>
                <Link to='/postview'>1234</Link>
              </li>
              <li>
                <Link to='/postview'>1234</Link>
              </li>
              <li>
                <Link to='/postview'>1234</Link>
              </li>
            </ul>
        </div>
        <div className='subbuttons'>
            <div class="pagination">
                <a href="#">&lt;&lt;</a>
                <a href="#">&lt;</a>
                <a class="active" href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">6</a>
                <a href="#">&gt;</a>
                <a href="#">&gt;&gt;</a>
            </div>
            <button id="freewrite"
              onClick={() => {
                navigate('/write');
              }}
              >글쓰기</button>
        </div>
    </MainBackgorund>
  );
}

export default Freeboard;
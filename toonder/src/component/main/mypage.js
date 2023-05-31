import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./mainPage.css";
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';


function Mypage() {
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


      <div className='mainUserInfo'>
        <div className='mainInfo'>
          <img></img>
          <h2>{loggedUserName}</h2>
<<<<<<< HEAD
          <button id='changeInfo'
          onClick={() => {
            navigate('/check_password');
          }}
          ><h3>정보수정</h3></button>
=======
          <button id='changeInfo' onClick={() => {
              navigate('/infochange');
            }}><h3>정보수정</h3></button>
>>>>>>> main
        </div>

        <h1>#멜로 #코믹 #액션 #유미의 세포들 #연애혁명</h1>
      </div>

      <div className='subUserInfo'>
        <div className='myReview'>
          <h2>나의 리뷰</h2>
          <section>
            <h4>유미의 세포들</h4>
            <ul>
              <li>사람의 감정과 이성의 중도를 너무 간결하게 이해시켜주는 작품인 거 같습니다!</li>
            </ul>
          </section>
        </div>
        <div className='myPost'>
          <h2>나의 자유게시판 글</h2>
          <section>
            <ul>
              <li>원주민 공포만화 관련 정보 올려주세요!</li>
            </ul>
          </section>
        </div>
      </div>
    </MainBackgorund>
  );
}

export default Mypage;
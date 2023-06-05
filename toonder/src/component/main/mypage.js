import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './mainPage.css';
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';
import supabase from '../supabase';

function Mypage() {
  const navigate = useNavigate();
  const [loggedUserName, setLoggedUserName] = useState(
    localStorage.getItem('loggedUserName')
  );
  const [loggedUserHashTag, setLoggedUserHashTag] = useState(
    localStorage.getItem('loggedUserHashTag')
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session.user.email;
      const requestData = {
        email: email,
      };

      axios
        .post('toonder/mypage', requestData)
        .then((hashData) => {
          console.log(hashData.data.mem_hashtag);
          setLoggedUserHashTag(hashData.data.mem_hashtag);
          localStorage.setItem('loggedUserHashTag', hashData.data.mem_hashtag);
        })
        .catch((error) => console.log(error));

      if (!localStorage.getItem('loggedUserName')) {
        axios
          .post('toonder/name', requestData)
          .then((loggedUserData) => {
            console.log(loggedUserData.data.mem_name);
            setLoggedUserName(loggedUserData.data.mem_name);
            localStorage.setItem(
              'loggedUserName',
              loggedUserData.data.mem_name
            );
          })
          .catch((error) => console.log(error));
      }
    };

    fetchData();
  }, []);

  return (
    <MainBackgorund>
      <div className="mainUserInfo">
        <div className="mainInfo">
          <img></img>
          <h2>{loggedUserName}</h2>
          <button
            id="changeInfo"
            onClick={() => {
              navigate('/infochange');
            }}
          >
            <h3>정보수정</h3>
          </button>
        </div>

        <h1>{loggedUserHashTag}</h1>
      </div>

      <div className="subUserInfo">
        <div className="myReview">
          <h2>나의 리뷰</h2>
          <section>
            <h4>유미의 세포들</h4>
            <ul>
              <li>
                사람의 감정과 이성의 중도를 너무 간결하게 이해시켜주는 작품인 거
                같습니다!
              </li>
            </ul>
          </section>
        </div>
        <div className="myPost">
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

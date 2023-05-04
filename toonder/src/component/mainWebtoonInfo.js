import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./mainPage.css";
import MainBackgorund from './mainBackground';
import ex1 from "../images/ex1.png"


function MainWebtoonInfo() {
  const navigate = useNavigate();

  return (
    <MainBackgorund>
      <div className='mainWebtoonInfo'>
        <div className='mainwtInfo'>
          <img src={ex1} alt="image error" />
          <div className='subwtInfo'>
            <h1>웹툰 정보</h1>
            <ul>
              <li>제목 : 유미의 세포들</li>
              <li>글 / 그림 : 이동건</li>
              <li>연재처 : 네이버 웹툰</li>
            </ul>
          </div>
        </div>
        <div className='mainStory'>
            <h1>줄거리</h1>
            <ul>
              <li>유미는 지금 무슨 생각을 하고 있을까? 그녀의 머릿속에서 바쁘게 움직이는 세포들 이야기!</li>
            </ul>
        </div>
      </div>
      <div className='mainReview'>
        <h1>리뷰</h1>
        <section>
          <ul>
            <li>사람의 감정과 이성의 중도를 너무 간결하게 이해시켜주는 작품인 거 같습니다!” - Hanna Lee</li>
            <li>네이버 웹툰 중에서 제일 재밌음! - Stephan Lee</li>
            <li>설레는 포인트도 많고, 정주행 10번은 해야지~ - Howard Wolowitz</li>
          </ul>
        </section>
        <input type="text" placeholder='    리뷰를 달아보세요!'></input>
      </div>
    </MainBackgorund>
  );
}

export default MainWebtoonInfo;
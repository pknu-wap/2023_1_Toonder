import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./mainPage.css";
import MainBackgorund from './mainBackground';
import ex1 from "../images/ex1.png"
import ex2 from "../images/ex2.png"
import ex3 from "../images/ex3.png"
import ex4 from "../images/ex4.png"
import MainBackSmall from './mainBackSmall';

import {useLocation} from 'react-router';

function Mainpage() {
  const navigate = useNavigate();
  return (
    <MainBackgorund>
      <MainBackSmall>
      <div className='mainPage'>
        <main>
          <h2>실시간 인기 반응 웹툰</h2>
          <table>
            <td><button
            onClick={() => {
            navigate('/mainwebtooninfo');
            }}><img src={ex1} alt="image error" /></button></td>
            <td><button><img src={ex2} alt="image error" /></button></td>
            <td><button><img src={ex3} alt="image error" /></button></td>
            <td><button><img src={ex4} alt="image error" /></button></td>
          </table>
        </main>
        <div className='botPage'>
          <section>
            <ul>
              <li>사람의 감정과 이성의 중도를 너무 간결하게 이해시켜주는 작품인 거 같습니다!” - Hanna Lee</li>
              <li>네이버 웹툰 중에서 제일 재밌음! - Stephan Lee</li>
              <li>설레는 포인트도 많고, 정주행 10번은 해야지~ - Howard Wolowitz</li>
            </ul>
          </section>
        </div>
      </div>
      </MainBackSmall>
    </MainBackgorund>
  );
}

export default Mainpage;
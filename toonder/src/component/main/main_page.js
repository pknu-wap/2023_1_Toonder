import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './mainPage.css';
import MainBackgorund from '../backgrounds/mainBackground';
import MainBackSmall from '../backgrounds/mainBackSmall';
import supabase from '../supabase';
import { useLocation } from 'react-router';
import axios from 'axios';
import logo from '../../images/logoimage.png';
import { FaSpinner } from 'react-icons/fa'; // 로딩 아이콘 추가

function Mainpage(props) {
  const navigate = useNavigate();
  const [loggedUserName, setLoggedUserName] = useState(
    localStorage.getItem('loggedUserName') || '지금 로그인 하세요'
  );
  const [resdata, setResData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRecommendation = () => {
    setIsLoading(true); // 새로운 추천 웹툰 이미지를 가져오기 전에 로딩 상태를 true로 설정

    const fetchData = async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session.user.email;
      const requestData = {
        email: email,
      };

      axios
        .post('toonder/recommand', requestData)
        .then((res) => {
          console.log(res.data);
          setResData(res.data);
          setIsLoading(false); // 데이터 가져오기 완료 후 로딩 상태 변경
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session.user.email;
      const requestData = {
        email: email,
      };

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

      axios
        .post('toonder/recommand', requestData)
        .then((res) => {
          console.log(res.data);
          setResData(res.data);
          setIsLoading(false); // 데이터 가져오기 완료 후 로딩 상태 변경
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);

  return (
    <MainBackgorund>
      {' '}
      <div className="refresh">
        <h2>사용자 추천 웹툰</h2>
        <button onClick={handleRecommendation}>추천 새로 받기</button>
      </div>
      <MainBackSmall loggedUserName={loggedUserName}>
        <div className="mainPage">
          {isLoading ? ( // 로딩 중일 때의 화면
            <div style={{ fontSize: '50px', color: 'white' }}>
              &nbsp;&nbsp; 웹툰 추천 받는 중...{' '}
              <FaSpinner className="loadingIcon" />
            </div>
          ) : (
            <main>
              <table>
                <tbody>
                  <tr>
                    {resdata.map((item, index) => (
                      <td key={index}>
                        <button
                          className="refresh"
                          onClick={() => {
                            navigate('/mainwebtooninfo');
                          }}
                        >
                          <div className="imageContainer">
                            <img
                              src={item.imageDownloadUrl}
                              alt="image error"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = logo;
                              }}
                            />
                          </div>
                          <br />
                          <br />
                          <p
                            className="webtoonTitle"
                            style={{ fontSize: '22px', color: 'white' }}
                          >
                            {item.title}
                          </p>
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </main>
          )}
          <div className="botPage">
            <section>
              <ul>
                <li>
                  사람의 감정과 이성의 중도를 너무 간결하게 이해시켜주는 작품인
                  거 같습니다!” - Hanna Lee
                </li>
                <li>네이버 웹툰 중에서 제일 재밌음! - Stephan Lee</li>
                <li>
                  설레는 포인트도 많고, 정주행 10번은 해야지~ - Howard Wolowitz
                </li>
              </ul>
            </section>
          </div>
        </div>
        {props.children}
      </MainBackSmall>
    </MainBackgorund>
  );
}

export default Mainpage;

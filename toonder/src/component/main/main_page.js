import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './mainPage.css';
import MainBackgorund from '../backgrounds/mainBackground';
import MainBackSmall from '../backgrounds/mainBackSmall';
import supabase from '../supabase';
import { useLocation } from 'react-router';
import axios from 'axios';
import logo from '../../images/logo2.png';
import { FaSpinner } from 'react-icons/fa'; // 로딩 아이콘 추가

function Mainpage(props) {
  const navigate = useNavigate();
  const [resdata, setResData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (session === null) {
        alert('로그인을 먼저 해주세요.');
        navigate('/');
      } else {
        const email = session.user.email;
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
      }
    };

    fetchData();
  }, []);

  const handleRecommendation = () => {
    setIsLoading(true); // 새로운 추천 웹툰 이미지를 가져오기 전에 로딩 상태를 true로 설정

    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;
      const email = session.user.email;
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

  return (
    <MainBackgorund>
      <div style={{ position: 'relative' }}>
        <h2
          style={{
            position: 'absolute',
            color: 'white',
            display: 'flex',
            zIndex: 1,
            top: '90px',
            left: '300px',
          }}
        >
          추천 웹툰 목록
        </h2>
      </div>{' '}
      <MainBackSmall>
        <div className="mainPage">
          <div style={{ position: 'absolute' }}>
            <button
              onClick={handleRecommendation}
              style={{
                position: 'absolute',
                color: 'rgb(255, 147, 147)',
                display: 'flex',
                backgroundColor: 'white',
                width: '150px',
                height: '25px',
                justifyContent: 'center', // 가로 가운데 정렬
                alignItems: 'center',
                fontSize: '22px',
                top: '-235px',
                left: '765px',
                borderRadius: '10px',
              }}
            >
              추천 새로 받기
            </button>
          </div>
          {isLoading ? ( // 로딩 중일 때의 화면
            <div
              style={{
                fontSize: '100px',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              <FaSpinner className="loadingIcon" />
            </div>
          ) : (
            <main>
              <div className="recommendationButtonWrapper"></div>
              <table>
                <tbody>
                  <tr>
                    {resdata.map((item, index) => (
                      <td key={index}>
                        <button
                          className="refresh"
                          onClick={() => {
                            navigate('/mainwebtooninfo', {
                              state: { mastrId: item.mastrId },
                            });
                          }}
                        >
                          <div className="imageContainer">
                            <img
                              className="webtoonImage"
                              src={item.imageDownloadUrl}
                              alt="image error"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = logo;
                              }}
                            />
                          </div>
                          <br />

                          <p
                            className="webtoonTitle"
                            style={{ fontSize: '18px', color: 'white' }}
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

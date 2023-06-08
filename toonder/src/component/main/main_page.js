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
  const [reviewContent, setReviewContent] = useState([]);
  const [reviewName, setReviewName] = useState([]);
  const [webTitile, setWebTitle] = useState([]);
  const [webId, setwebId] = useState([]);

  useEffect(() => {
    document.title = 'Toonder';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (session === null) {
        alert('로그인을 먼저 해주세요.');
        navigate('/');
      } else {
        const email = session.user.email;
        sessionStorage.setItem('loggedUserEmail', email);
        const requestData = {
          email: email,
        };

        axios
          .post('toonder/recommand', requestData)
          .then((res) => {
            setResData(res.data);
            setIsLoading(false); // 데이터 가져오기 완료 후 로딩 상태 변경
          })
          .catch((error) => console.log(error));

        axios
          .get('toonder/recentReviews')
          .then((res) => {
            const data = res.data;
            console.log(data);
            const webId = data.map((review) => review.webtoon.mastrId);
            const webTitile = data.map((review) => review.webtoon.title);

            const content = data.map((review) => review.revContent);
            const userName = data.map((review) => review.member.mem_name);

            console.log(content);
            console.log(userName);

            setWebTitle(webTitile);
            setReviewContent(content);
            setReviewName(userName);
            setwebId(webId);
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
            <h2
              style={{
                marginLeft: '50px',
                marginTop: '16px',
                marginBottom: '15px',
              }}
            >
              최근 리뷰
            </h2>
            <section
              style={{
                overflowY: 'scroll',
                overflowX: 'hidden',
                maxHeight: '500px',
              }}
            >
              <ul
                style={{
                  marginTop: '40px',
                  marginLeft: '10px',
                }}
              >
                {reviewContent.slice(0, 3).map((content, index) => (
                  <div
                    style={{
                      marginTop: '15px',
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        width: '820px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                        minHeight: '30px',
                      }}
                    >
                      <div style={{ marginBottom: '6px' }}>
                        <a
                          onClick={() => {
                            navigate('/mainwebtooninfo', {
                              state: { mastrId: webId[index] },
                            });
                          }}
                        >
                          📖 {webTitile[index]}
                        </a>
                      </div>
                      {reviewName[index]} : {content}
                      <div
                        style={{
                          borderTop: '1px solid rgb(255, 147, 147)',
                          width: '100%',
                          margin: '10px 0 ',
                        }}
                      />
                    </div>
                  </div>
                ))}
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

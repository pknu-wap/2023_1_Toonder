import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './mainPage.css';
import axios from 'axios';
import MainBackgorund from '../backgrounds/mainBackground';
import toTop from '../../images/toTop.png';
import MainBackSmall from '../backgrounds/mainBackSmall';
import { FaSpinner } from 'react-icons/fa'; // 로딩 아이콘 추가

function SearchWebtoonList() {
  useEffect(() => {
    document.title = 'Toonder 웹툰검색';
  }, []);
  const [webtoonList, setWebToonList] = useState([]);
  const [countPage, setCountPage] = useState(1);
  const [firstLoading, setFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showNavigationToScrollTop, setShowNavigationToScrollTop] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchContent = location.state?.searchContent;
  //console.log(searchContent);

  function onScroll() {
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrolledToBottom =
      Math.ceil(window.scrollY + windowHeight) >= documentHeight;

    if (window.scrollY === 0) {
      setShowNavigationToScrollTop(false);
    } else {
      setShowNavigationToScrollTop(true);
    }

    if (scrolledToBottom) {
      if (webtoonList.length < 64) {
      } else {
        setIsLoading(true);
        setCountPage(countPage + 1);
      }
    }
  }

  useEffect(() => {
    if (!isLoading) {
      window.addEventListener('scroll', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  });

  useEffect(() => {
    setWebToonList([]);
    setCountPage(1);
    setFirstLoading(true);
    setIsLoading(true);

    axios
      .get(
        `toonder/webtoon/search?keyword=${encodeURIComponent(
          searchContent
        )}&page=${countPage}`
      )
      .then((res) => {
        //console.log(res.data);
        if (res.data.length === 0) {
          alert('검색어에 일치하는 웹툰이 없습니다.');
          navigate(-1);
        }
        if (res.data.length > 0) {
          setIsLoading(false);
          setWebToonList(res.data);
          setFirstLoading(false);
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        setIsLoading(false);
        // 에러 처리를 원하는 대로 수행하세요.
      });
  }, [searchContent]);

  const listCreator = () => {
    var countForTrSplit = 1;
    var trWebtoonList = [];
    return (
      <>
        {firstLoading ? (
          <div
            style={{
              fontSize: '30px',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
            }}
          >
            <FaSpinner className="loadingIcon" />
          </div>
        ) : (
          <>
            <table>
              {webtoonList.map((webtoonInfo, index) => {
                if (countForTrSplit === 1) {
                  trWebtoonList = [];
                }

                trWebtoonList.push(webtoonInfo);
                if (countForTrSplit === 4 || index === webtoonList.length - 1) {
                  countForTrSplit = 1;
                  return (
                    <tr key={index}>
                      {trWebtoonList.map((trWebtoonInfo, trIndex) => (
                        <td key={trIndex}>
                          <div className="webtoonContainer">
                            <button
                              onClick={() => {
                                navigate('/mainwebtooninfo', {
                                  state: { mastrId: trWebtoonInfo.mastrId },
                                });
                              }}
                            >
                              <img
                                src={trWebtoonInfo.imageDownloadUrl}
                                alt="image error"
                              />
                            </button>
                            <div className="titleWrap">
                              <p className="webtoonTitle">
                                {trWebtoonInfo.title}
                              </p>
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                } else {
                  countForTrSplit += 1;
                }
              })}
            </table>
            {isLoading && (
              <div
                style={{
                  fontSize: '30px',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '60px',
                }}
              >
                <FaSpinner className="loadingIcon" />
              </div>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <MainBackgorund>
        <MainBackSmall>
          <div className="mainWebtoonList">{listCreator()}</div>

          {showNavigationToScrollTop && (
            <div
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                width: '50px',
                height: '50px',
                position: 'fixed',
                bottom: '10%',
                right: '5%',
                opacity: '70%',
              }}
            >
              <img
                src={toTop}
                alt="To Top"
                style={{ height: '100%', width: '100%' }}
              />
            </div>
          )}
        </MainBackSmall>
      </MainBackgorund>
    </>
  );
}

export default SearchWebtoonList;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './mainPage.css';
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';
import supabase from '../supabase';
import ex1 from '../../images/ex1.png';
import { FaSpinner } from 'react-icons/fa'; // 로딩 아이콘 추가

function Mypage() {
  useEffect(() => {
    document.title = 'Toonder 마이페이지';
  }, []);
  const [brdNo, setBrdNo] = useState([]);
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [isBoardLoading, setIsBoardLoading] = useState(true);
  const itemsPerPage = 3;
  const navigate = useNavigate();
  const [loggedUserName, setLoggedUserName] = useState(
    localStorage.getItem('loggedUserName')
  );
  const [loggedUserHashTag, setLoggedUserHashTag] = useState(
    localStorage.getItem('loggedUserHashTag')
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [boardData, setBoardData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [webId, setwebId] = useState([]);
  const [webtoonTitles, setWebtoonTitles] = useState([]);
  const [loggedUserImage, setLoggedUserImage] = useState(
    localStorage.getItem('loggedUserPhoto') || ex1
  );
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [reviewStartIndex, setReviewStartIndex] = useState(0);
  const handleReviewPrevious = () => {
    if (reviewStartIndex >= itemsPerPage) {
      setReviewStartIndex(reviewStartIndex - itemsPerPage);
    }
  };
  const handleReviewNext = () => {
    if (reviewStartIndex + itemsPerPage < webtoonTitles.length) {
      setReviewStartIndex(reviewStartIndex + itemsPerPage);
    }
  };

  // 나의 자유게시판 글 페이지 관련 상태 변수 및 이벤트 핸들러
  const [postStartIndex, setPostStartIndex] = useState(0);
  const handlePostPrevious = () => {
    if (postStartIndex >= itemsPerPage) {
      setPostStartIndex(postStartIndex - itemsPerPage);
    }
  };
  const handlePostNext = () => {
    if (postStartIndex + itemsPerPage < boardData.length) {
      setPostStartIndex(postStartIndex + itemsPerPage);
    }
  };
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
          setLoggedUserHashTag(hashData.data.mem_hashtag);
          localStorage.setItem('loggedUserHashTag', hashData.data.mem_hashtag);
        })
        .catch((error) => console.log(error));

      if (!localStorage.getItem('loggedUserName')) {
        axios
          .post('toonder/name', requestData)
          .then((loggedUserData) => {
            setLoggedUserName(loggedUserData.data.mem_name);
            localStorage.setItem(
              'loggedUserName',
              loggedUserData.data.mem_name
            );
          })
          .catch((error) => console.log(error));
      }

      //내 게시글 불러오기
      axios
        .post('toonder/mypage/board/', requestData)
        .then((boardRes) => {
          const data = boardRes.data; // 받아온 게시글 데이터
          //console.log(data);
          const reversedData = [...data].reverse();
          const titles = reversedData.map((review) => review.brdTitle);
          const brdNo = reversedData.map((review) => review.brdNo);
          setBoardData(titles);
          setBrdNo(brdNo);
          setIsBoardLoading(false);
        })
        .catch((error) => {
          console.log('Error:', error);
        });

      // 리뷰 불러오기
      axios
        .post('/toonder/mypage/review', requestData)
        .then((reviewRes) => {
          const data = reviewRes.data; // 받아온 리뷰 데이터
          //console.log(data);
          const reversedData = [...data].reverse();
          const titles = reversedData.map((review) => review.webtoon.title);
          const contents = reversedData.map((review) => review.revContent);
          const webId = data.map((review) => review.webtoon.mastrId);
          setwebId(webId.reverse());
          setWebtoonTitles(titles);
          console.log(webId)
          setReviewData(contents);

          setIsReviewLoading(false);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    };

    fetchData();
  }, []);

  return (
    <MainBackgorund>
      <div className="mainUserInfo">
        <div className="mainInfo">
          <div onClick={openModal}>
            <img id="infoimg" src={loggedUserImage} alt="image error" />
          </div>
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
          <section style={{ marginLeft: '30px' }}>
            {isReviewLoading ? ( // 로딩 중일 때의 화면
              <div
                style={{
                  marginTop: '60px',
                  fontSize: '70px',
                  color: 'grey',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <FaSpinner className="loadingIcon" />
              </div>
            ) : (
              <ul>
                {webtoonTitles
                  .slice(reviewStartIndex, reviewStartIndex + itemsPerPage)
                  .map((title, index) => (
                    <div key={index}>
                      <div
                        style={{
                          marginTop: '10px',
                          marginLeft: '0px',
                          width: '245px',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-all',
                          minHeight: '40px',
                        }}
                      >
                        <p
                          style={{
                            marginBottom: '10px',
                          }}
                        >
                          [리뷰]
                        </p>
                        {reviewData[index + reviewStartIndex]}
                      </div>

                      <a
                        onClick={() => {
                          navigate('/mainwebtooninfo', {
                            state: { mastrId: webId[index] },
                          });
                        }}
                        style={{
                          marginTop: '-50px',
                          marginLeft: '260px',
                          width: '220px',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-all',
                          minHeight: '50px',
                        }}
                      >
                        📖 {title}
                      </a>
                      <div
                        style={{
                          borderTop: '1px solid rgb(255, 147, 147)',
                          width: '100%',
                          margin: '10px 0 ',
                        }}
                      />
                    </div>
                  ))}
              </ul>
            )}
          </section>
          <div>
            <button
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                position: 'relative',
                top: '-260px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '40px',
                color: '#FF9393',
                width: '40px',
                marginLeft: '450px',
                marginRight: '0px',
                outline: 'none',
              }}
              onClick={handleReviewPrevious}
            >
              &#x3C;
            </button>
            <button
              onClick={handleReviewNext}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                position: 'relative',
                top: '-301px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '40px',
                color: '#FF9393',
                width: '40px',
                marginLeft: '530px',
                marginRight: '0px',
                outline: 'none',
              }}
            >
              &#x3E;
            </button>
          </div>
        </div>
        <div className="myPost">
          <h2>나의 자유게시판 글</h2>
          <section style={{ marginLeft: '30px' }}>
            {isBoardLoading ? ( // 로딩 중일 때의 화면
              <div
                style={{
                  marginTop: '60px',
                  fontSize: '70px',
                  color: 'grey',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <FaSpinner className="loadingIcon" />
              </div>
            ) : (
              <ul>
                {boardData
                  .slice(postStartIndex, postStartIndex + itemsPerPage)
                  .map((title, index) => (
                    <div key={index}>
                      <p
                        style={{
                          marginBottom: '17px',
                        }}
                      >
                        {' '}
                        [제목]
                      </p>
                      <a
                        onClick={() => {
                          navigate('/postview', {
                            state: { brdNo: brdNo[index] },
                          });
                        }}
                      >
                        📝 {title}
                      </a>
                      <div
                        style={{
                          borderTop: '1px solid rgb(255, 147, 147)',
                          width: '100%',
                          margin: '10px 0 ',
                        }}
                      />
                    </div>
                  ))}
              </ul>
            )}
          </section>
          <div>
            <button
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                position: 'relative',
                top: '-260px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '40px',
                color: '#FF9393',
                width: '40px',
                marginLeft: '450px',
                marginRight: '0px',
                outline: 'none',
              }}
              onClick={handlePostPrevious}
            >
              &#x3C;
            </button>
            <button
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                position: 'relative',
                top: '-301px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '40px',
                color: '#FF9393',
                width: '40px',
                marginLeft: '530px',
                marginRight: '0px',
                outline: 'none',
              }}
              onClick={handlePostNext}
            >
              &#x3E;
            </button>
          </div>
        </div>
      </div>
      <div>
        {modalOpen && (
          <ModalBasic
            setModalOpen={setModalOpen}
            setLoggedUserImage={setLoggedUserImage}
            openModal={openModal}
          />
        )}
      </div>
    </MainBackgorund>
  );
}

function ModalBasic({ setModalOpen, setLoggedUserImage, openModal }) {
  const [selectedImage, setSelectedImage] = useState(
    localStorage.getItem('loggedUserPhoto') || ex1
  );
  const [newImage, setNewImage] = useState(null);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setNewImage(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (newImage) {
      //console.log('새 이미지 저장:', newImage);

      const { data } = await supabase.auth.getSession();
      axios
        .post('toonder/photo/update', {
          email: data.session.user.email,
          image: selectedImage,
        })
        .catch((error) => console.log(error));

      localStorage.setItem('loggedUserPhoto', selectedImage);
      setLoggedUserImage(selectedImage);
    }

    closeModal();
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div className="profilechangeback">
      <div className="profilechange" ref={modalRef}>
        <img id="changeinfoimg" src={selectedImage} alt="image error" />
        <div id="changeFile">
          <label htmlFor="chooseFile">
            <h3>프로필 사진 변경</h3>
          </label>
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type="file"
            id="chooseFile"
            name="chooseFile"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              position: 'absolute',
              right: '-200px',
              top: '0px',
              marginTop: '10px',
            }}
          />
        </div>
        <div id="changeButtonSet" style={{ marginTop: '25px' }}>
          <button id="submitButton" type="submit" onClick={handleSave}>
            <h3>저장</h3>
          </button>
          <br />
          <button id="cancel" onClick={closeModal}>
            <h3>취소</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;

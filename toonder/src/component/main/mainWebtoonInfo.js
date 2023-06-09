import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './mainPage.css';

import MainBackgorund from '../backgrounds/mainBackground';
import Modal from './modal';

import logo2 from '../../images/logo2.png';

import zero from '../../images/zero.png';
import one from '../../images/one.png';
import two from '../../images/two.png';
import three from '../../images/three.png';
import four from '../../images/four.png';
import five from '../../images/five.png';
import six from '../../images/six.png';
import seven from '../../images/seven.png';
import eight from '../../images/eight.png';
import nine from '../../images/nine.png';
import ten from '../../images/ten.png';

import MainBackSmall from '../backgrounds/mainBackSmall';
import axios from 'axios';
import supabase from '../supabase';

function MainWebtoonInfo() {
  useEffect(() => {
    document.title = 'Toonder 웹툰 정보';
  }, []);
  const { state } = useLocation();
  const { mastrId } = state;

  const [userEmail, setUserEmail] = useState('');

  const [webtoonImage, setWebtoonImage] = useState(logo2);
  const [webtoonTitle, setWebtoonTitle] = useState('');
  const [webtoonOutline, setWebtoonOutline] = useState('');
  const [webtoonAuthors, setWebtoonAuthors] = useState('');
  const [webtoonPlatform, setWebtoonPlatform] = useState('');
  const [webtoonGenre, setWebtoonGenre] = useState('');

  const [reviewList, setReviewList] = useState([]);

  const [inputReviewText, setInputReviewText] = useState('');

  const [openModalForRegRating, setOpenModalForRefRating] = useState(false);
  const [openModalForConfirm, setOpenModalForConfirm] = useState(false);
  const [openModalConfirmMessage, setOpenModalConfirmMessage] = useState(false);
  const [openModalForModify, setOpenModalForModify] = useState(false);

  const [regRateValue, setRegRateValue] = useState(5.0);
  const imageForRateStar = [
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
  ];
  const rateToInteger = {
    0: 0,
    0.5: 1,
    1.0: 2,
    1.5: 3,
    2.0: 4,
    2.5: 5,
    3.0: 6,
    3.5: 7,
    4.0: 8,
    4.5: 9,
    5.0: 10,
  };

  const [textModalForModify, setTextModalForModify] = useState('');
  const [textModalRateValue, setTextModalRateValue] = useState(0.5);
  const [textModalRevNo, setTextModalRevNo] = useState();

  useEffect(() => {
    setUserEmailForStart();

    axios.get('toonder/webtoon/' + mastrId).then((res) => {
      const webtoonInfo = res.data;
      setWebtoonImage(webtoonInfo.imageDownloadUrl);
      setWebtoonTitle(webtoonInfo.title);
      setWebtoonOutline(webtoonInfo.outline);
      setWebtoonAuthors(
        webtoonInfo.sntncWritrNm === webtoonInfo.pictrWritrNm ||
          webtoonInfo.sntncWritrNm === '' ||
          webtoonInfo.pictrWritrNm === ''
          ? webtoonInfo.pictrWritrNm
          : webtoonInfo.sntncWritrNm + ' / ' + webtoonInfo.pictrWritrNm
      );
      setWebtoonPlatform(webtoonInfo.pltfomCdNm);
      setWebtoonGenre(webtoonInfo.mainGenreCdNm);
    });

    axios.get('toonder/webtoon/' + mastrId + '/review').then((res) => {
      //console.log(res.data);
      setReviewList(res.data);
    });

    
  }, []);

  const setUserEmailForStart = async () => {
    const { data, error } = await supabase.auth.getSession();
    const session = data.session;
    setUserEmail(session.user.email);
  };

  const handleRegReview = () => {
    if (inputReviewText === '') {
      alert('리뷰를 등록하시려면 내용을 입력해주세요!');
    } else {
      setOpenModalForRefRating(true);
    }
  };

  const handleConfirmModal = () => {
    setOpenModalForRefRating(false);
    setOpenModalForConfirm(true);
  };

  const sendingReviewToBackEnd = () => {
    const sendingReviewData = {
      revContent: inputReviewText,
      revRating: regRateValue,
      memName: localStorage.getItem('loggedUserName'),
      mem_email: userEmail,
    };

    //console.log(sendingReviewData);

    axios
      .post('toonder/webtoon/' + mastrId + '/review', sendingReviewData)
      .then((res) => {
        //console.log(res.data);
        setReviewList(reviewList.concat(res.data));
      })
      .catch((error) => console.log(error));

    setInputReviewText('');

    setRegRateValue(5.0);
    setOpenModalForConfirm(false);
    setOpenModalConfirmMessage(true);
  };

  const sendingModifiedReviewToBackEnd = () => {
    const sendingReviewData = {
      revContent: textModalForModify,
      revRating: textModalRateValue,
      memName: localStorage.getItem('loggedUserName'),
      mem_email: userEmail,
    };

    //console.log(sendingReviewData);

    axios
      .put(
        'toonder/webtoon/' + mastrId + '/review/' + textModalRevNo,
        sendingReviewData
      )
      .then((res) => {
        //console.log(res.data);
        setReviewList(
          reviewList.map((review) =>
            review.revNo === textModalRevNo ? res.data : review
          )
        );
      })
      .catch((error) => console.log(error));

    setOpenModalForModify(false);
  };

  const handleChange = (event) => {
    //console.log(event.target);
    setInputReviewText(event.target.value);
  };

  const handleChangeForModal = (event) => {
    //console.log(event.target);
    setTextModalForModify(event.target.value);
  };

  const closeModal = () => {
    setOpenModalForRefRating(false);
    setOpenModalForConfirm(false);
    setOpenModalConfirmMessage(false);
    setOpenModalForModify(false);
    setRegRateValue(5.0);
  };

  const deleteReview = (revNo, review) => {
    const sendingData = {
      revContent: review.revContent,
      revRating: review.revRating,
      mem_name: review.memName,
      mem_email: review.memEmail,
    };
    //console.log(revNo);
    //console.log(sendingData);
    //console.log('toonder/webtoon/' + mastrId + '/review/' + revNo);

    axios
      .delete('toonder/webtoon/' + mastrId + '/review/' + revNo, {
        data: sendingData,
      })
      .catch((error) => console.log(error));

    setReviewList(reviewList.filter((review) => review.revNo !== revNo));
  };

  return (
    <>
      <div>
        {openModalForRegRating && (
          <Modal>
            <div style={{ height: '40%' }}>
              <h2
                style={{
                  position: 'relative',
                  top: '-20%',
                  left: '15%',
                  marginBottom: '20px',
                  fontSize: '30px',
                }}
              >
                ⭐별점 주기⭐
              </h2>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button
                  onClick={() => {
                    setRegRateValue(
                      regRateValue - 0.5 >= 0 ? regRateValue - 0.5 : 0
                    );
                  }}
                  style={{
                    marginRight: '20px',
                    fontSize: '25px',
                    backgroundColor: 'transparent',
                    width: '40px',
                  }}
                >
                  -
                </button>
                <img
                  style={{ position: 'relative', top: '-10%', width: '130px' }}
                  src={imageForRateStar[rateToInteger[regRateValue]]}
                  alt={regRateValue}
                />
                <button
                  onClick={() => {
                    setRegRateValue(
                      regRateValue + 0.5 <= 5 ? regRateValue + 0.5 : 5
                    );
                  }}
                  style={{
                    marginLeft: '20px',
                    backgroundColor: 'transparent',
                    fontSize: '25px',
                    width: '40px',
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <button
              style={{
                backgroundColor: '#FF9393',
                color: 'white',
                position: 'relative',
                top: '5%',
                fontSize: '20px',
                width: '50px',
                height: '30px',
              }}
              onClick={handleConfirmModal}
            >
              확인
            </button>
            <button
              style={{
                backgroundColor: '#FF9393',
                color: 'white',
                position: 'relative',
                top: '15%',
                fontSize: '20px',
                width: '50px',
                height: '30px',
              }}
              onClick={closeModal}
            >
              취소
            </button>
          </Modal>
        )}
      </div>

      <div>
        {openModalForConfirm && (
          <Modal>
            <div style={{ height: '40%' }}>
              <h2 style={{ position: 'relative', top: '-20%' }}>
                리뷰를 등록하시겠습니까?
              </h2>
            </div>
            <button
              style={{
                backgroundColor: '#FF9393',
                color: 'white',
                position: 'relative',
                top: '5%',
                fontSize: '20px',
                width: '50px',
                height: '30px',
              }}
              onClick={sendingReviewToBackEnd}
            >
              확인
            </button>
            <button
              style={{
                backgroundColor: '#FF9393',
                color: 'white',
                position: 'relative',
                top: '15%',
                fontSize: '20px',
                width: '50px',
                height: '30px',
              }}
              onClick={closeModal}
            >
              취소
            </button>
          </Modal>
        )}
      </div>

      <div>
        {openModalConfirmMessage && (
          <Modal>
            <div style={{ height: '40%' }}>
              <h2 style={{ position: 'relative', top: '-20%' }}>
                리뷰가 등록되었습니다.
              </h2>
            </div>
            <button
              style={{
                backgroundColor: '#FF9393',
                color: 'white',
                position: 'relative',
                top: '0%',
                fontSize: '20px',
              }}
              onClick={closeModal}
            >
              확인
            </button>
          </Modal>
        )}
      </div>

      <div>
        {openModalForModify && (
          <Modal>
            <div style={{ height: '40%' }}>
              <h2
                style={{
                  backgroundColor: '#FF9393',
                  color: 'white',
                  position: 'relative',
                  top: '-10%',
                }}
              >
                리뷰 수정
              </h2>
            </div>
            <div style={{backgroundColor : 'white', borderRadius:'10px', position: 'relative',top: '-15%',
            width: '90%',height: '30%', alignItems:'center',justifyItems:'center'}}>
            <input
              type="text"
              onChange={handleChangeForModal}
              value={textModalForModify}
              style={{
               height:'100%',
               marginLeft:'10px',
                
              }}
            />
            </div>
            <div
              style={{
                position: 'relative',
                top: '-5%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <button
                onClick={() => {
                  setTextModalRateValue(
                    textModalRateValue - 0.5 >= 0 ? textModalRateValue - 0.5 : 0
                  );
                }}
                style={{
                  marginRight: '20px',
                  backgroundColor: 'transparent',
                  fontSize: '25px',
                  width: '20px',
                }}
              >
                -
              </button>
              <img
                style={{ position: 'relative', top: '-10%' }}
                src={imageForRateStar[rateToInteger[textModalRateValue]]}
                alt={textModalRateValue}
              />
              <button
                onClick={() => {
                  setTextModalRateValue(
                    textModalRateValue + 0.5 <= 5 ? textModalRateValue + 0.5 : 5
                  );
                }}
                style={{
                  marginLeft: '20px',
                  backgroundColor: 'transparent',
                  fontSize: '25px',
                  width: '20px',
                }}
              >
                +
              </button>
            </div>
            <button
              style={{
                backgroundColor: '#FF9393',
                color: 'white',
                position: 'relative',
                top: '0%',
                fontSize: '20px',
              }}
              onClick={sendingModifiedReviewToBackEnd}
            >
              수정
            </button>
            <button
              style={{
                backgroundColor: '#FF9393',
                color: 'white',
                position: 'relative',
                top: '5%',
                fontSize: '20px',
              }}
              onClick={closeModal}
            >
              취소
            </button>
          </Modal>
          
        )}
      </div>


  
      <MainBackgorund>
        <MainBackSmall>
          <div className="mainWebtoonInfo">
            <div className="mainwtInfo">
              <img src={webtoonImage} alt="image error" onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = logo2;
                              }}/>
              <div className="subwtInfo">
                <h1>웹툰 정보</h1>
                <div>
                  <text
                    style={{
                      fontSize: '20px',
                      position: 'relative',
                      top: '20px',
                      right: '10%',
                      color: 'white',
                    }}
                  >
                    <strong>" {webtoonGenre} " </strong>
                    <a
                      href={`https://www.youtube.com/results?search_query=${webtoonGenre} 관련 BGM`}
                      target="_blank"
                    >
                      <text
                        style={{
                          textDecorationLine: 'underline',
                          fontSize: '15px',
                        }}
                      >
                        장르에 대한 BGM 검색
                      </text>
                    </a>
                  </text>
                </div>
                <ul>
                  <div style={{overflow : 'auto'}}>
                    <li style={{marginTop:'5px'}}>제목 : <div style ={{marginLeft : '10px',marginTop : '10px'}}>- {webtoonTitle}</div></li>
                    <li>글 / 그림 : <div style ={{marginTop : '10px'}}><div style ={{marginLeft : '10px',marginTop : '10px'}}>- {webtoonAuthors}</div></div></li>
                    <li>연재처 : <div style ={{marginLeft : '10px',marginTop : '10px'}}>- {webtoonPlatform}</div></li>
                  </div>
                </ul>
              </div>
            </div>

            <div className="mainStory">
              <h1>줄거리</h1>
              <ul style={{overflow : 'auto'}}>
                <li style ={{margin:'10px'}}>
                  {webtoonOutline}
                </li>
              </ul>
            </div>
          </div>

          <div className="mainReview">
            <h1>리뷰</h1>
            <section>
              <ul>
                {[...reviewList].reverse().map((review) => (
                  <li key={review.revNo}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      {review.revContent}
                      <img
                        src={imageForRateStar[rateToInteger[review.revRating]]}
                        alt={review.revRating}
                        style={{ height: '15px', margin: '5px' }}
                      />
                      <text style={{ marginRight: '5px' }}> - </text>

                      {review.memName === null
                        ? localStorage.getItem('loggedUserName')
                        : review.memName}

                      {review.memEmail === userEmail ? (
                        <div>
                          <div
                            className="mainWebtoonReview"
                            style={{ display: 'flex', flexDirection: 'row' }}
                          >
                            <text style={{ marginLeft: '10px' }}>[ </text>
                            <button
                              onClick={() => {
                                setTextModalForModify(review.revContent);
                                setTextModalRevNo(review.revNo);
                                setTextModalRateValue(review.revRating);
                                //console.log(review.revNo);
                                setOpenModalForModify(true);
                              }}
                            >
                              수정
                            </button>
                            <text>|</text>
                            <button
                              onClick={() => deleteReview(review.revNo, review)}
                            >
                              삭제
                            </button>
                            <text>]</text>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            
            <div style={{ marginTop:'30px',display:'flex' ,flexDirection:'row', alignItems:'center', justifyItems:'center'}}>
              <div style={{borderRadius:'10px',backgroundColor:'white' ,marginLeft : '37px', width: '760px' ,height: '58px'}}>
              <input
                id="reviewInputBox"
                type="text"
                value={inputReviewText}
                onChange={handleChange}
                placeholder="리뷰를 달아보세요!"
                style={{marginTop : '10px', marginLeft:'10px',height:'60%', width:'90%'}}
                
              />
              </div>

              <button onClick={() => handleRegReview()} id="reviewRegButton">
                등록
              </button>
            </div>
          </div>
        </MainBackSmall>
      </MainBackgorund>
    </>
  );
}
export default MainWebtoonInfo;

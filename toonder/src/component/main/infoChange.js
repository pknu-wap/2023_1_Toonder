import React, { useState, useEffect, useRef } from 'react';
import Background from '../backgrounds/backGround';
import supabase from '../supabase';
import styles from './infoChange.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa'; // 로딩 아이콘 추가

function InfoC() {
  useEffect(() => {
    document.title = 'Toonder 정보변경';
  }, []); //페이지 타이틀
  //이메일관련
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [message, setMessage] = useState(null);
  const [pwLoading, setPwLoading] = useState(false);
  const [firstName, setFirstName] = useState(''); //이름 값
  const [lastName, setLastName] = useState(''); //성씨 값
  const navigate = useNavigate();
  const [notAllow, setNotAllow] = useState(true); //회원가입 버튼 활성화 여부
  const [selectedHashtags, setSelectedHashtags] = useState('');
  const [loading, setLoading] = useState(false);
  const [pwNotAllow, setPwNotAllow] = useState(false);
  useEffect(() => {
    const storedHashtags = localStorage.getItem('loggedUserHashTag');
    if (storedHashtags) {
      const tags = storedHashtags.split(' ').map((tag) => tag.replace('#', ''));
      setSelectedHashtags(tags);
    }
  }, []); //사용자 해시태그 정보 가져옴

  useEffect(() => {
    //이메일 유효성과 비밀번호 유효성이 바꼈을때 둘다 유효한 경우만 login버튼 활성화 해주는 기능
    if (emailValid) setPwNotAllow(false);
    else setPwNotAllow(true);
    return;
  }, [emailValid]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPwLoading(true);
    setMessage('');
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/newpw',
      });
      const [id, domain] = email.split('@');
      const hiddenID = id.slice(0, 3) + id.slice(3).replace(/./g, '*');
      const hiddenEmail = hiddenID + '@' + domain;
      setMessage(
        <div>비밀번호 재설정 링크가 {hiddenEmail}로 보내졌습니다</div>
      );
    } catch (error) {
      console.error(error);
      setMessage(
        <div>비밀번호 재설정이 실패하였습니다. 다시 시도해 주세요</div>
      );
    } finally {
      setPwLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const hashtag = '#' + selectedHashtags.join(' #');
    const email = sessionStorage.getItem('loggedUserEmail');

    try {
      axios
        .post('toonder/update', {
          mem_email: email,
          mem_name: lastName + firstName,
          mem_hashtag: hashtag,
        })
        .then(() => {
          localStorage.removeItem('loggedUserName');
          localStorage.removeItem('loggedUserHashTag');
          setLoading(false);
          alert('회원정보가 변경되었습니다.');
          navigate(-1);
        })
        .catch(() => {
          console.log(
            'Error for sending user data to Spring - creating member'
          );
          alert('회원정보 변경 중에 오류가 발생했습니다.');
        });
    } catch (error) {
      console.error(error);
      alert('회원정보 변경 중에 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      selectedHashtags.length > 0
    )
      setNotAllow(false);
    else setNotAllow(true);

    return;
  }, [firstName, lastName, selectedHashtags]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedHashtags((prevSelectedHashtags) => [
        ...prevSelectedHashtags,
        value,
      ]);
    } else {
      setSelectedHashtags((prevSelectedHashtags) =>
        prevSelectedHashtags.filter((hashtag) => hashtag !== value)
      );
    }
  };

  const hashtagOptions = [
    '공포',
    '드라마',
    '코믹',
    '일상',
    '판타지',
    '액션',
    '역사',
    '학원',
    'SF',
    '학습만화',
    '캠페인',
    '스포츠',
    '동성애',
    '추리',
    '모험',
    '무협',
    '시사',
    '교양',
    '요리',
    '성인',
    '순정',
    'BL',
    '소년',
    '미스터리',
    'GL',
    '로맨스판타지',
    '카툰',
    '기관발행물',
    '만화이론',
    '로맨스',
    '그래픽노블',
    '개그',
  ];

  return (
    <Background text="Info Change" backgroundSize="600px 580px">
      {loading ? (
        <div
          style={{
            fontSize: '100px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: '390px',
          }}
        >
          <FaSpinner className={styles.loadingIcon} />
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className={styles.name}>
              <input
                type="text"
                onChange={handleFirstName}
                id="firstName"
                placeholder="이름"
                autoComplete="off"
              />
              <input
                type="text"
                onChange={handleLastName}
                id="lastName"
                placeholder="성"
                autoComplete="off"
              />
            </div>
            {!selectedHashtags.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    color: 'white',
                    fontSize: '15px',
                    left: '75%',
                    top: '40px',
                  }}
                >
                  좋아하는 만화 장르를 1개 이상 선택
                </div>
              </div>
            )}

            <CheckboxContainer>
              {hashtagOptions.map((hashtag) => (
                <CheckboxLabel key={hashtag}>
                  <CheckboxInput
                    type="checkbox"
                    value={hashtag}
                    onChange={handleCheckboxChange}
                    checked={selectedHashtags.includes(hashtag)}
                  />
                  {hashtag}
                </CheckboxLabel>
              ))}
            </CheckboxContainer>
            <div>
              <button
                className={styles.submit}
                disabled={notAllow}
                type="submit"
              >
                <strong>Info Change</strong>
              </button>
            </div>
          </form>

          <div className={styles.findPw}>
            {pwLoading ? (
              <div
                style={{
                  fontSize: '30px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'absolute',
                }}
              >
                <FaSpinner
                  style={{
                    marginLeft: '75px',
                    animation: 'spin 1s linear infinite',
                  }}
                />
              </div>
            ) : message ? (
              <>
                <h1
                  style={{
                    position: 'relative',
                    color: 'white',
                    fontSize: '15px',

                    left: '305px',
                    top: '-0px',
                    width: '500px',
                  }}
                >
                  {message}
                </h1>
                <button
                  style={{
                    position: 'relative',
                    color: 'white',

                    left: '30px',
                    top: '-10px',
                    width: '500px',
                  }}
                  onClick={() => setMessage(false)}
                >
                  확인
                </button>
              </>
            ) : (
              <form onSubmit={handleResetPassword}>
                <div>
                  {!emailValid && email.length > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          color: 'white',
                          fontSize: '15px',
                          left: '-90%',
                          top: '-20px',
                          width: '180px',
                        }}
                      >
                        올바른 이메일을 입력해주세요
                      </div>
                    </div>
                  )}
                </div>
                <input
                  id="enter_email"
                  onChange={handleEmail}
                  type="text"
                  placeholder="Enter your E-mail"
                />
                <button disabled={pwNotAllow} type="submit">
                  Send Code
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </Background>
  );
}

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  width: 470px;
  transform: translateX(5%);
  display: flex;
  justify-content: center;
  position: absolute;
  top: 450px;
  border-radius: 10px;
  background-color: white;
  color: grey;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  width: 50%;
  margin-bottom: 5px;
`;

const CheckboxInput = styled.input`
  margin-right: 15px;
  margin-left: 65px;
`;

export default InfoC;

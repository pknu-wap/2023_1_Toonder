import React, { useState, useEffect } from 'react';
import Background from '../backgrounds/backGround';
import supabase from '../supabase';
import styles from './join.module.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 160px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  width: 470px;
  transform: translateX(5%);
  display: flex;
  justify-content: center;
  position: absolute;
  top: 455px;
  border-radius: 10px;
  background-color: white;
  color: grey;

  /* 스크롤 스타일 적용 */
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

function Join() {
  useEffect(() => {
    document.title = 'Toonder 회원가입';
  }, []);
  const [pw, setPw] = useState(''); //비밀번호 값
  const [pwc, setPwc] = useState(''); //비밀번호 확인 값
  const [isPwCheck, setIsPwCheck] = useState(false); //비밀번호 확인 여부
  const [isPwValid, setIsPwValid] = useState(false); //비밀번호 유효성 여부
  const [firstName, setFirstName] = useState(''); //이름 값
  const [lastName, setLastName] = useState(''); //성씨 값
  const [email, setEmail] = useState(''); //이메일 값
  const [notAllow, setNotAllow] = useState(true); //회원가입 버튼 활성화 여부
  const [isValidEmail, setEmailValid] = useState(false); //이메일 유효성 여부
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedHashtags, setSelectedHashtags] = useState([]);

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

  useEffect(() => {
    if (
      isValidEmail &&
      isPwCheck &&
      isPwValid &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      selectedHashtags.length > 0
    )
      setNotAllow(false);
    else setNotAllow(true);
    return;
  }, [
    isValidEmail,
    isPwValid,
    isPwCheck,
    firstName,
    lastName,
    selectedHashtags,
  ]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePW = (e) => {
    setPw(e.target.value);

    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (regex.test(e.target.value)) {
      setIsPwValid(true);
    } else {
      setIsPwValid(false);
    }

    if (e.target.value === pwc) {
      setIsPwCheck(true);
    } else {
      setIsPwCheck(false);
    }
  };

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

  const handleCheckPw = (e) => {
    setPwc(e.target.value);

    if (pw === e.target.value) {
      setIsPwCheck(true);
    } else {
      setIsPwCheck(false);
    }
  };

  const handleSubmit = async (e) => {
    //////////////체크박스로 입력받은 해시태그는 공백으로 단어가 분리된 문자열로 저장을 해서 데이터로 보냄
    setLoading(true);
    const hashtag = '#' + selectedHashtags.join(' #');
    axios
      .post('toonder/join', {
        mem_email: email,
        mem_name: lastName + firstName,
        mem_hashtag: hashtag,
      })
      .catch(function () {
        console.log('Error for sending user data to Spring - creating member');
      });

    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pw,
    });

    if (error) {
      alert(error);
      setLoading(false);
    } else alert('인증 메일을 발송했습니다. 이메일 확인 후 로그인해주세요.');
    navigate('/');
  };

  return (
    <Background text="Join" backgroundSize="600px 500px">
      {loading ? (
        <div
          style={{
            fontSize: '120px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            top: '385px',
            position: 'absolute',
          }}
        >
          <FaSpinner className={styles.loadingIcon} />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.name}>
            <input
              type="text"
              onChange={handleFirstName}
              id="firstName"
              placeholder="이름"
            />
            <input
              type="text"
              onChange={handleLastName}
              id="lastName"
              placeholder="성"
            />
          </div>
          <div className={styles.email}>
            {!isValidEmail && email.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  color: 'white',
                  fontSize: '15px',
                }}
              >
                올바른 이메일을 입력해주세요
              </div>
            )}
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmail}
              placeholder="이메일 입력"
            />
          </div>
          <div className={styles.password}>
            {!isPwValid && pw.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  color: 'white',
                  fontSize: '15px',
                }}
              >
                영문, 숫자 포함 8~10자 이상 입력해주세요
              </div>
            )}
            <input
              type="password"
              onChange={handlePW}
              value={pw}
              placeholder="비밀번호"
            />
            {!isPwCheck && pw.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  color: 'white',
                  fontSize: '15px',
                  left: '270px',
                  fontWeight: 'normal',
                }}
              >
                비밀번호를 한번 더 정확히 입력해주세요
              </div>
            )}
            <input
              type="password"
              onChange={handleCheckPw}
              value={pwc}
              placeholder="비밀번호 확인"
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
                  left: '70%',
                  top: '-10px',
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
                />
                {hashtag}
              </CheckboxLabel>
            ))}
          </CheckboxContainer>
          <div>
            <button className={styles.submit} disabled={notAllow} type="submit">
              <strong>Join</strong>
            </button>
          </div>
        </form>
      )}
    </Background>
  );
}
export default Join;

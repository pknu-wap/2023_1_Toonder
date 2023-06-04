import React, { useState, useEffect, useRef } from 'react';
import Background from '../backgrounds/backGround';
import supabase from '../supabase';
import styles from './infoChange.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

function InfoC() {
  useEffect(() => {
    document.title = 'Toonder 정보변경';
  }, []); //페이지 타이틀

  const [firstName, setFirstName] = useState(''); //이름 값
  const [lastName, setLastName] = useState(''); //성씨 값
  const [pw, setPw] = useState(''); //비밀번호 값
  const [pwc, setPwc] = useState(''); //비밀번호 확인 값
  const [isPwCheck, setIsPwCheck] = useState(false); //비밀번호 확인 여부
  const [isPwValid, setIsPwValid] = useState(false); //비밀번호 유효성 여부
  const navigate = useNavigate();
  const [notAllow, setNotAllow] = useState(true); //회원가입 버튼 활성화 여부
  const [selectedHashtags, setSelectedHashtags] = useState('');

  useEffect(() => {
    const storedHashtags = localStorage.getItem('loggedUserHashTag');
    if (storedHashtags) {
      const tags = storedHashtags.split(' ').map((tag) => tag.replace('#', ''));
      setSelectedHashtags(tags);
    }
  }, []); //사용자 해시태그 정보 가져옴

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hashtag = '#' + selectedHashtags.join(' #');
    const email = sessionStorage.getItem('loggedUserEmail');

    try {
      await supabase.auth.updateUser({ password: pw });

      axios
        .post('toonder/update', {
          mem_email: email,
          mem_name: lastName + firstName,
          mem_hashtag: hashtag,
        })
        .then(() => {
          localStorage.removeItem('loggedUserName');
          localStorage.removeItem('loggedUserHashTag');
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
      isPwCheck &&
      isPwValid &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      selectedHashtags.length > 0
    )
      setNotAllow(false);
    else setNotAllow(true);

    return;
  }, [isPwValid, isPwCheck, firstName, lastName, selectedHashtags]);

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

  const handleCheckPw = (e) => {
    setPwc(e.target.value);
    if (pw === e.target.value) {
      setIsPwCheck(true);
    } else {
      setIsPwCheck(false);
    }
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
    <Background text="Info Change" backgroundSize="600px 500px">
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
            autoComplete="off"
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
                left: '70%',
                top: '-50px',
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
          <button className={styles.submit} disabled={notAllow} type="submit">
            <strong>Info Change</strong>
          </button>
        </div>
      </form>
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
  top: 391px;
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

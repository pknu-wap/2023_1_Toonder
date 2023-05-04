import React, { useState, useEffect, useRef } from 'react';
import Background from './backGround';
import supabase from './supabase';
import styles from './signIn.module.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

function Signin() {
  useEffect(() => {
    document.title = 'Toonder 회원가입';
  }, []);
  const inputRef = useRef(null);
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
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState([]);
  const whitelist = [
    '액션',
    '멜로',
    '판타지',
    '코믹',
    '가',
    '나',
    '다',
    '라',
    '마',
    '드라마',
  ];

  const onKeyPress = (e) => {
    e.preventDefault();
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      const tagValue = e.target.value.trim();
      if (whitelist.includes(tagValue) && !tagList.includes(tagValue)) {
        // whitelist에 지정된 단어들만 입력 가능하도록 검사
        submitTagItem();
      } else {
        e.target.value = '';
      }
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem('');
  };

  const deleteTagItem = (e) => {
    e.preventDefault();
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };
  useEffect(() => {
    if (
      isValidEmail &&
      isPwCheck &&
      isPwValid &&
      firstName.length > 0 &&
      lastName.length > 0
    )
      setNotAllow(false);
    else setNotAllow(true);
    return;
  }, [isValidEmail, isPwValid, isPwCheck, firstName, lastName]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePW = (e) => {
    setPw(e.target.value);

    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (regex.test(pw)) {
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
    if (regex.test(email)) {
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
      setIsPwCheck('false');
    }
  };

  const handleSubmit = async (e) => {
    axios
      .post('api/member/insert', {
        mem_id: email,
        mem_name: firstName + lastName,
        mem_hashtag: '',
      })
      .catch(function () {
        console.log('Error for sending user data to Spring - creating member');
      });

    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pw,
    });

    console.log(data.user);
    if (error) {
      alert(error);
    } else alert('인증 메일을 발송했습니다. 이메일 확인 후 로그인해주세요.');
    navigate('/');
  };

  return (
    <Background text="Join" backgroundSize="600px 500px">
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

        <div className={styles.textBox}>
          <WholeBox
            onClick={() => {
              inputRef.current.focus();
            }}
          >
            <TagBox
              onClick={() => {
                inputRef.current.focus();
              }}
            >
              <div
                onClick={() => {
                  inputRef.current.focus();
                }}
                style={{
                  color: 'grey',
                  background: 'white',
                  fontSize: '14px',
                  height: '14px',
                }}
              >
                ------좋아하는 장르를 엔터로 추가해주세요
                [액션,판타지,멜로,코믹,드라마]------
              </div>
              {tagList.map((tagItem, index) => {
                const backgroundColor =
                  index % 3 === 0
                    ? 'rgb(255, 147, 147)'
                    : index % 3 === 1
                    ? 'rgb(219, 235, 170)'
                    : 'rgb(248, 249, 176)';
                return (
                  <TagItem
                    style={{ backgroundColor: backgroundColor }}
                    key={index}
                  >
                    <Text>{tagItem}</Text>
                    <Button
                      style={{ backgroundColor: backgroundColor }}
                      onClick={deleteTagItem}
                    >
                      ❌
                    </Button>
                  </TagItem>
                );
              })}
              <TagInput
                type="text"
                tabIndex={2}
                onChange={(e) => setTagItem(e.target.value)}
                value={tagItem}
                onKeyPress={onKeyPress}
                ref={inputRef}
              />
            </TagBox>
          </WholeBox>
        </div>
        <div>
          <button className={styles.submit} disabled={notAllow} type="submit">
            <strong>Join</strong>
          </button>
        </div>
      </form>
    </Background>
  );
}

const WholeBox = styled.div`
  padding: 0px;
  width: 490px;
  height: 180px;
  transform: translateX(0%);
  background-color: white;
  border-radius: 10px;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 30px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: white;
  border-color: white;
`;

const TagItem = styled.span`
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
  color: black;
  font-size: 15px;
  height: 45px;
`;

const Text = styled.span``;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  font-size: 15px;
  height: 15px;
  margin-left: 5px;

  border-radius: 50%;
  color: red;
`;

const TagInput = styled.input`
  display: inline-flex;
  width: 45px;
  height: 15px;
  font-family: 'Sans-serif';
  font-weight: 500;
  border-radius: 0px;
  background: white;
  border: none;
  outline: none;
  cursor: text;
`;

export default Signin;

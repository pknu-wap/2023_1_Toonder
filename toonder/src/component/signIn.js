import React, { useState, useEffect } from 'react';
import Background from './backGround';
import { useNavigate } from 'react-router-dom';
import styles from './signIn.module.css';

const User = {
  email: 'abc@gmail.com',
  pw: '1234a1234',
}; //가상의 유저가 있다고 치는 더미데이터

function Signin() {
  const [pw, setPw] = useState('');
  const [pwc, setPwc] = useState('');
  const [isPwCheck, setIsPwCheck] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false); //비밀번호 유효성
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [notAllow, setNotAllow] = useState(true); //로그인 (submit)버튼 활성화 여부
  const [isValidEmail, setEmailValid] = useState(false);

  useEffect(() => {
    //이메일 유효성과 비밀번호 유효성이 바꼈을때 둘다 유효한 경우만 login버튼 활성화 해주는 기능
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
    //위와 마찬가지 비밀번호인 경우
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
    //이메일 값을 value에 state
    setEmail(e.target.value);
    const regex = //이메일 유효성검사 하기위한 객체
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
      setIsPwCheck(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }; //디폴트로 페이지가 랜더링되는거 막아주는 기능

  const CheckDuplicateEmail = () => {};

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
          {!isValidEmail &&
            email.length > 0 && ( //이메일이 유효하지 않고 이메일을 입력하기 시작하면 에러 메세지가 뜸
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
          <button
            type="button"
            disabled={!isValidEmail}
            onclick={CheckDuplicateEmail}
          >
            중복 확인
          </button>
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
          <textarea rows="4" cols="50"></textarea>
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

export default Signin;

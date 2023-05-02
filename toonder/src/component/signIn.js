import React, { useState, useEffect } from 'react';
import Background from './backGround';

import styles from './signIn.module.css';
import { useNavigate } from 'react-router-dom';

function Signin() {
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
  const [isEmailDufCheck, setEmailDufCheck] = useState(false); //이메일 중복성 여부
  const [notAllow, setNotAllow] = useState(true); //회원가입 버튼 활성화 여부
  const [isValidEmail, setEmailValid] = useState(false); //이메일 유효성 여부
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (
      isValidEmail &&
      isPwCheck &&
      isPwValid &&
      isEmailDufCheck &&
      firstName.length > 0 &&
      lastName.length > 0
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
    isEmailDufCheck,
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
    setEmailDufCheck(false);
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
      setIsPwCheck(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }; //디폴트로 페이지가 랜더링되는거 막아주는 기능

  const CheckDuplicateEmail = () => {
    if (email) {
      alert('중복된 이메일 입니다.');
      setEmailDufCheck(false);
    } else {
      alert('사용가능한 이메일 입니다.');
      setEmailDufCheck(true);
    }
  };

  const onClickConfirm = () => {
    alert('회원가입에 성공했습니다.');
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
          <button
            type="button"
            disabled={!isValidEmail}
            onClick={CheckDuplicateEmail}
          >
            이메일 확인
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
          <button
            className={styles.submit}
            disabled={notAllow}
            type="submit"
            onClick={onClickConfirm}
          >
            <strong>Join</strong>
          </button>
        </div>
      </form>
    </Background>
  );
}

export default Signin;

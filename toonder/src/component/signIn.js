import React, { useState, useEffect } from 'react';
import Background from './backGround';
import supabase from './supabase';
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
  const [notAllow, setNotAllow] = useState(true); //회원가입 버튼 활성화 여부
  const [isValidEmail, setEmailValid] = useState(false); //이메일 유효성 여부
  const navigate = useNavigate();

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
      setIsPwCheck(false);
    }
  };

  const handleSubmit = async (e) => {
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

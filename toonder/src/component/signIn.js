import React, { useState } from 'react';
import Background from './backGround';
import { useNavigate } from 'react-router-dom';
import styles from './signIn.module.css';

const User = {
  email: 'abc@gmail.com',
  pw: '12341234a',
}; //가상의 유저가 있다고 치는 더미데이터

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function Signin() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [notAllow, setNotAllow] = useState(true); //로그인 (submit)버튼 활성화 여부
  const handleSubmit = (event) => {
    event.preventDefault();
  }; //디폴트로 페이지가 랜더링되는거 막아주는 기능

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValidEmail(event.target.checkValidity());
  };

  const CheckDuplicateEmail = () => {};

  return (
    <Background text="Join" backgroundSize="600px 500px">
      <form onSubmit={handleSubmit}>
        <div className={styles.name}>
          <input type="text" id="firstName" placeholder="이름" />
          <input type="text" id="lastName" placeholder="성" />
        </div>
        <div className={styles.email}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일 입력"
          />
          <button type="button" onclick={CheckDuplicateEmail}>
            중복 확인
          </button>
        </div>
        <div className={styles.password}>
          <input type="password" id="pw" placeholder="비밀번호" />
          <input type="password" id="pwConfirm" placeholder="비밀번호 확인" />
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

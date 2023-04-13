import React, { useState } from 'react';
import Background from './backGround';
import { useNavigate } from 'react-router-dom';
import styles from './signIn.module.css';

function Signin() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
  }; //디폴트로 페이지가 랜더링되는거 막아주는 기능

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValidEmail(event.target.checkValidity());
  };

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
          <button type="button">중복 확인</button>
        </div>
        <div>
          <input type="password" id="confirmPassword" v />
        </div>
      </form>
    </Background>
  );
}

export default Signin;

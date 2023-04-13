import React, { useState } from 'react';
import Background from './backGround';
import { useNavigate } from 'react-router-dom';
import styles from './signIn.module.css';

function Signin() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 회원가입 데이터 서버로 전송 로직 구현
  };

  return (
    <Background text="Join" backgroundSize="600px 500px">
      <div className={styles.name}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </form>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>

      <div className={styles.email}>
        <form>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />

          <button type="button">중복 확인</button>
        </form>
      </div>
    </Background>
  );
}

export default Signin;

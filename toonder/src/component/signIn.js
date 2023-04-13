import React, { useState } from 'react';
import Background from './backGround';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hashTags, setHashTags] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleHashTagsChange = (event) => {
    setHashTags(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 회원가입 데이터 서버로 전송 로직 구현
  };

  return (
    <Background text="Join" backgroundSize="600px 500px">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName" />
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>

        <div>
          <label htmlFor="lastName" />
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>

        <div>
          <label htmlFor="email" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <button type="button">중복확인</button>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>

        <div>
          <label htmlFor="hashTags" />
          <textarea
            type="text"
            id="hashTags"
            value={hashTags}
            onChange={handleHashTagsChange}
            placeholder="#webtoon #recommendation #action"
          />
        </div>

        <button button type="submit">
          Sign Up
        </button>
      </form>
    </Background>
  );
}

export default Signin;

import React, { useState } from 'react';
import styles from './login.module.css'; //CSS Module 이라는 기술을 사용하면, CSS 클래스가 중첩되는 것을 완벽히 방지할 수 있음 C
import IDBackground from './ID_background';
import { useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
  return (
    //클래스를 설정할땐 styles객체안에 있는 값을 참조하는 방식
    <div>
      <IDBackground text="Login">
        <div className={styles.Login}>
          <form>
            <input type="text" placeholder="Enter your ID" />
            <input type="text" placeholder="Enter your password" />
            <button type="submit">
              <strong>Login</strong>
            </button>
          </form>
        </div>
      </IDBackground>
      <div className={styles.FindnSign}>
        <button
          onClick={() => {
            navigate('/findid');
          }}
          id="find_id_button"
        >
          아이디 찾기
        </button>
        <button id="find_pw_button">비밀번호 찾기</button>
        <button
          onClick={() => {
            navigate('/signin');
          }}
          id="sign_in"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Login;

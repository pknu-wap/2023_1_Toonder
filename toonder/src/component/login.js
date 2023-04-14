import React, { useState } from 'react';
import styles from '../style.css';
import IDBackground from './ID_background';
import { useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
  return (
    //클래스를 설정할땐 styles객체안에 있는 값을 참조하는 방식
    <div>
      <IDBackground text="Login">
        <div className="findid_body">
          <form>
            <input id="enter_name" type="text" placeholder="Enter your ID" />
            <input
              id="enter_id"
              type="text"
              placeholder="Enter your password"
            />
            <button
              onClick={() => {
                navigate('/main_page');
              }}
              id="sign_in"
              type="submit">
              <strong>Login</strong>
            </button>
          </form>
          <button
            onClick={() => {
              navigate('/findid');
            }}
            id="find_id_button"
          >
            아이디 찾기
          </button>
          <button
            onClick={() => {
              navigate('/findpw');
            }}
            id="find_pw_button">
              비밀번호 찾기
          </button>

          <button
            onClick={() => {
              navigate('/findpw');
            }}
            id="sign_in">
              회원가입
            </button>
        </div>
      </IDBackground>
    </div>
  );
}

export default Login;

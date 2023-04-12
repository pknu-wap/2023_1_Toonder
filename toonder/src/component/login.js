import React from 'react';
import IDBackground from './ID_background';
import { useNavigate } from 'react-router-dom';
import "../style.css";


function Login() {
  const navigate = useNavigate();
  return (
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
            <button type="submit">
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
            id="find_pw_button"
          >비밀번호 찾기</button>
          <button id="sign_in">회원가입</button>
        </div>
      </IDBackground>
    </div>
  );
}

export default Login;

import React from 'react';
import IDBackground from './ID_background';
import { useNavigate } from 'react-router-dom';
import "../style.css";


function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <IDBackground text="Login">
        {/* 구현 필요: CSS적인 요소로 현재 find id 와 login 의 입력창의 위치가 다소 다름 이를 해결해야 함*/}
        <div className="login_body">{/* findid_body -> login_body*/}
          <form>
            <input id="enter_name" type="text" placeholder="Enter your ID" />
            <input
              id="enter_id"
              type="text"
              placeholder="Enter your password"
            />
            <button type="submit" id="loginButton">
              <strong>Login</strong>
            </button>
          </form>
          <div className='buttonSet'>
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
        </div>
      </IDBackground>
    </div>
  );
}

export default Login;

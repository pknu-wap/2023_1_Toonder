import React, { useState } from 'react';
import styles from '../style.css';
import JoinFindBtn from './joinFindBtn';
import IDBackground from './ID_background';
import Findid from './findid';


function Login() {

  const [isFindid, setIsFindid] = useState(true);

  function switchToFindid() {
    setIsFindid(false);
  }

  return (
  <div>
    {isFindid ? (
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
          <button onClick={switchToFindid} id="find_id_button">아이디 찾기</button>
          <button id="find_pw_button">비밀번호 찾기</button>
          <button id="sign_in">회원가입</button>
        </div>
        </IDBackground>
        ) : (
        <Findid />
      )}
    </div>
  );
}

export default Login;

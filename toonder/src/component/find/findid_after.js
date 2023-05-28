import React from "react";
import { useNavigate } from 'react-router-dom';
import IDBackground from '../backgrounds/ID_background';
import styles from '../style.css';


function Findid_after() {
  const navigate = useNavigate();

  return (
    <IDBackground text="Find ID">
      <div className="findid_body">
        <h1>이거 보이면 됨 제발 ㅜㅜ</h1>
        <div className="findIdAfterButtonset">
          <button
            onClick={() => {
              navigate('/findpw');
            }}
            id="find_pw_button">
              비밀번호 찾기
          </button>

          <button
            onClick={() => {
              navigate('/');
            }}
            id="loginButton">
              확인
            </button>
          </div>
      </div>
    </IDBackground>
  );
}

export default Findid_after;


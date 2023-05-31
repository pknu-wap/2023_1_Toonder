import React from 'react';
import IDBackground from '../backgrounds/ID_background';
import { useNavigate } from 'react-router-dom';
import "../style.css";

function Findpw() {
  const navigate = useNavigate();

  return (
    <IDBackground text="Find PW">
      <div className="findpw_body">
        <form>
          {/*구현 필요: e-mail을 입력 받고 그 이메일로 임시 비번 전송하는 구현 필요*/}
          <input id="enter_email" type="text" placeholder="Enter your E-mail" />
          {/*설명: find_pw_after로 경로 설정하는 버튼*/}
          <button
          onClick={() => {
            navigate('/findpw_after');
          }}
          id="find_pw_after_button"
          >
            <strong>Send Code</strong>
          </button>
        </form>
      </div>
    </IDBackground>
  );
}

export default Findpw;

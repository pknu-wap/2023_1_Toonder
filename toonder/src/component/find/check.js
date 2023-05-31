import React from 'react';
import IDBackground from '../backgrounds/ID_background';
import { useNavigate } from 'react-router-dom';
import "../style.css";

function CheckPassword() {
  const navigate = useNavigate();

  return (
    <IDBackground text="Check Password">
      <div className="checkPw">
        <form>
          {/*구현 필요: e-mail을 입력 받고 그 이메일로 임시 비번 전송하는 구현 필요*/}
          <input id="enter_email" type="password" placeholder="Enter your Password" />
          <button
          onClick={() => {
            navigate('/info_change');
          }}
          id="passwordcheck"
          >
            <strong>Password check</strong>
          </button>
        </form>
      </div>
    </IDBackground>
  );
}

export default CheckPassword;

import React from 'react';
import IDBackground from './ID_background';
import { useNavigate } from 'react-router-dom';
import "../style.css";

function Findpw_after() {
  return (
    <IDBackground text="Find PW">
      <div className="findid_body">
        <p>
          임시 비밀번호가
          ~~로
          보내졌습니다.
        </p>
      </div>
    </IDBackground>
  );
}

export default Findpw_after;

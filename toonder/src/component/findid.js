import React from 'react';
import IDBackground from './ID_background';
import { useNavigate } from 'react-router-dom';
import "../style.css";

function Findid() {
  const navigate = useNavigate();

  return (
    <IDBackground text="Find ID">
        <div className="findid_body">
          <form>
            {/*설명: email과 이름을 넣는 입력창*/}
            <input id="enter_name" type="text" placeholder="Enter your name" />
            <input id="enter_id" type="text" placeholder="Enter your E-mail" />
            {/*구현 필요: DB와 연동하여 find 버튼응 눌렀을때 아이디를 알려주는 기능 필요*/}
            <button
            onClick={() => {
              navigate('/findid_after');
            }}
            id="find_id_after_button"
            >
              <strong>Find</strong>
            </button>
          </form>
        </div>
      </IDBackground>
  );
}

export default Findid;
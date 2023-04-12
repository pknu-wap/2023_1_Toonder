import React from 'react';
import IDBackground from './ID_background';
import Findpw_after from './findpw_after';
import { useNavigate } from 'react-router-dom';
import "../style.css";

function Findpw() {
  const navigate = useNavigate();

  return (
    <IDBackground text="Find PW">
        <div className="findid_body">
          <form>
            <input id="enter_email" type="text" placeholder="Enter your E-mail" />
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

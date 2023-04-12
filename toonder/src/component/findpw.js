import React from 'react';
import IDBackground from './ID_background';
import Findid_after from './findid_after';
import { useNavigate } from 'react-router-dom';
import "../style.css";

function Findpw() {
  const navigate = useNavigate();

  return (
    <IDBackground text="Find PW">
        <div className="findid_body">
          <form>
            <input id="enter_name" type="text" placeholder="Enter your name" />
            <input id="enter_id" type="text" placeholder="Enter your ID" />
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

export default Findpw;

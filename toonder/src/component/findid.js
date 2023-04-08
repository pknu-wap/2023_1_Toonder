import React, { useState } from 'react';
import styles from '../style.css';
import IDBackground from './ID_background';
import Findid_after from './findid_after';

function Findid() {
  const [isFindidAfter, setIsFindid] = useState(true);

  function switchToFindidAfter() {
    setIsFindid(false);
  }

  return (
    <IDBackground text="Find ID">
      {isFindidAfter ? (
        <div className="findid_body">
          <form>
            <input id="enter_name" type="text" placeholder="Enter your name" />
            <input id="enter_id" type="text" placeholder="Enter your ID" />
            <button type="button" onClick={switchToFindidAfter}>
              <strong>Find</strong>
            </button>
          </form>
        </div>
      ) : (
        <Findid_after />
      )}
    </IDBackground>
  );
}

export default Findid;

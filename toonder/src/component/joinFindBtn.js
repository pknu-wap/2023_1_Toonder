import React, { useState } from 'react';
import styles from '../style.css';
import Findid from './findid';

function JoinFindBtn() {
  const [isFindid, setIsFindid] = useState(true);

  function switchToFindid() {
    setIsFindid(false);
  }

  return (
    <div className="joinFindBtn">
      {isFindid ? (
      <form>
        <button onClick={switchToFindid}>아이디 찾기</button>
        <button>비밀번호 찾기</button>
        <button>회원가입</button>
      </form>
  ) : (
    <Findid />
  )}
  </div>
  );
}

export default JoinFindBtn;

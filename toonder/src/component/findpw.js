import React, { useState, useEffect } from 'react';
import IDBackground from './ID_background';
import { useNavigate } from 'react-router-dom';
import supabase from './supabase';
import styles from './findpw.module.css';

function Findpw() {
  useEffect(() => {
    document.title = 'Toonder 비밀번호 찾기';
  }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [message, setMessage] = useState(null);
  const [notAllow, setNotAllow] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //이메일 유효성과 비밀번호 유효성이 바꼈을때 둘다 유효한 경우만 login버튼 활성화 해주는 기능
    if (emailValid) setNotAllow(false);
    else setNotAllow(true);
    return;
  }, [emailValid]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/findid',
      });
      const [id, domain] = email.split('@');
      const hiddenID = id.slice(0, 3) + id.slice(3).replace(/./g, '*');
      const hiddenEmail = hiddenID + '@' + domain;
      setMessage(
        <div>
          비밀번호 재설정 링크가
          <br /> <br />
          {hiddenEmail}
          <br />
          <br />로 보내졌습니다
        </div>
      );
    } catch (error) {
      console.error(error);
      setMessage(
        <div>
          비밀번호 재설정이 실패하였습니다
          <br />
          <br />
          다시 시도해 주세요
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IDBackground text="Find PW" backgroundSize="600px 500px">
      <div className={styles.findPw}>
        {loading ? (
          <div className={styles.loading}>찾는 중 입니다...</div>
        ) : message ? (
          <div className={styles.afterFind}>
            <h1>{message}</h1>
            <button onClick={() => navigate(-1)}>확인</button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div>
              {!emailValid && email.length > 0 && (
                <div>올바른 이메일을 입력해주세요</div>
              )}
            </div>
            <input
              id="enter_email"
              onChange={handleEmail}
              type="text"
              placeholder="Enter your E-mail"
            />
            <button disabled={notAllow} type="submit">
              <strong>Send Code</strong>
            </button>
          </form>
        )}
      </div>
    </IDBackground>
  );
}

export default Findpw;

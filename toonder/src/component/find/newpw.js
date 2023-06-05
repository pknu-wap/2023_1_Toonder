import React, { useState, useEffect } from 'react';
import Background from '../backgrounds/backGround';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import styles from './newpw.module.css';
import { FaSpinner } from 'react-icons/fa';

function Newpw() {
  useEffect(() => {
    document.title = 'Toonder 비밀번호 재설정';
  }, []);
  const [pw, setPw] = useState(''); //비밀번호 값
  const [pwc, setPwc] = useState(''); //비밀번호 확인 값
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [notAllow, setNotAllow] = useState(true);
  const [isPwCheck, setIsPwCheck] = useState(false); //비밀번호 확인 여부
  const [isPwValid, setIsPwValid] = useState(false); //비밀번호 유효성 여부
  const [loading, setLoading] = useState(false);
  const removeToken = () => {
    // 토큰 삭제 로직을 구현합니다.
    supabase.auth.signOut();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await supabase.auth.updateUser({ password: pw });
      setMessage(
        <div>
          비밀번호 재설정이
          <br />
          <br />
          완료 되었습니다.
        </div>
      );
      removeToken(); // 재설정이 완료되면 토큰을 삭제합니다.
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
  useEffect(() => {
    if (isPwCheck & isPwValid) setNotAllow(false);
    else setNotAllow(true);
    return;
  }, [isPwCheck, isPwValid]);

  const handlePW = (e) => {
    setPw(e.target.value);

    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (regex.test(e.target.value)) {
      setIsPwValid(true);
    } else {
      setIsPwValid(false);
    }

    if (e.target.value === pwc) {
      setIsPwCheck(true);
    } else {
      setIsPwCheck(false);
    }
  };

  const handleCheckPw = (e) => {
    setPwc(e.target.value);

    if (pw === e.target.value) {
      setIsPwCheck(true);
    } else {
      setIsPwCheck(false);
    }
  };

  return (
    <Background text="New PW" backgroundSize="318px 265px">
      <form onSubmit={handleSubmit}>
        {loading ? (
          <div
            style={{
              fontSize: '80px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              marginTop: '-100px',
            }}
          >
            <FaSpinner className={styles.loadingIcon} />
          </div>
        ) : message ? (
          <div className={styles.afterFind}>
            <h1>{message}</h1>
            <button onClick={() => navigate('/')}>확인</button>
          </div>
        ) : (
          <div className={styles.password}>
            {!isPwValid && pw.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  color: 'white',
                  fontSize: '14px',
                  top: '-5px',
                  width: '234px',
                }}
              >
                영문, 숫자 포함 8~10자 이상 입력해주세요
              </div>
            )}
            <input
              type="password"
              onChange={handlePW}
              value={pw}
              placeholder="비밀번호"
            />
            {!isPwCheck && pw.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '87px',
                  color: 'white',
                  fontSize: '14px',
                  width: '219px',
                }}
              >
                비밀번호를 한번 더 정확히 입력해주세요
              </div>
            )}
            <input
              type="password"
              onChange={handleCheckPw}
              value={pwc}
              placeholder="비밀번호 확인"
            />
            <button className={styles.submit} disabled={notAllow} type="submit">
              <strong>Change PW</strong>
            </button>
          </div>
        )}
      </form>
    </Background>
  );
}

export default Newpw;

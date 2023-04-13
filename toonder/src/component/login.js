import React, { useState, useEffect } from 'react';
import styles from './login.module.css'; //CSS Module 이라는 기술을 사용하면, CSS 클래스가 중첩되는 것을 완벽히 방지할 수 있음 C
import IDBackground from './ID_background';
import { useNavigate } from 'react-router-dom';

const User = {
  email: 'test@example.com',
  pw: 't12341234',
};

function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const onClickConfirm = () => {
    if (email === User.email && pw === User.pw) {
      alert('로그인에 성공했습니다.');
    } else {
      alert('등록되지 않은 유저입니다.');
    }
  };
  useEffect(() => {
    if (emailValid && pwValid) setNotAllow(false);
    return;
  }, [emailValid, pwValid]);

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

  const handlePW = (e) => {
    setPw(e.target.value);
    const regex = /^[\da-zA-Z!@#]{8,}$/;
    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  let navigate = useNavigate();
  return (
    //클래스를 설정할땐 styles객체안에 있는 값을 참조하는 방식
    <div>
      <IDBackground text="Login">
        <form>
          <div className={styles.Login}>
            <div>
              {!emailValid && email.length > 0 && (
                <div>올바른 이메일을 입력해주세요</div>
              )}
            </div>
            <div>
              <input
                type="text"
                value={email}
                onChange={handleEmail}
                placeholder="Enter your e-mail"
              />
            </div>
            <div>
              {!pwValid && pw.length > 0 && (
                <div>영문, 숫자 포함 8자 이상 입력해주세요</div>
              )}
            </div>
            <div>
              <input
                type="password"
                value={pw}
                onChange={handlePW}
                placeholder="Enter your password"
              />
            </div>
            <button onClick={onClickConfirm} disabled={notAllow} type="submit">
              <strong>Login</strong>
            </button>
          </div>
        </form>
      </IDBackground>
      <div className={styles.FindnSign}>
        <button
          onClick={() => {
            navigate('/findid');
          }}
          id="find_id_button"
        >
          아이디 찾기
        </button>
        <button id="find_pw_button">비밀번호 찾기</button>
        <button
          onClick={() => {
            navigate('/signin');
          }}
          id="sign_in"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from 'react';
import styles from './login.module.css'; //CSS Module 이라는 기술을 사용하면, CSS 클래스가 중첩되는 것을 완벽히 방지할 수 있음
import IDBackground from '../backgrounds/ID_background';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import { FaSpinner } from 'react-icons/fa';
function Login() {
  useEffect(() => {
    document.title = 'Toonder 로그인';
  }, []);
  const [email, setEmail] = useState(''); //이메일 값
  const [password, setPw] = useState(''); //비밀번호 값
  const [emailValid, setEmailValid] = useState(false); //이메일 유효성
  const [pwValid, setPwValid] = useState(false); //비밀번호 유효성
  const [notAllow, setNotAllow] = useState(true); //로그인 (submit)버튼 활성화 여부
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // 이미 로그인된 상태인지 확인
    const checkLoggedIn = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (session !== null) {
        // 이미 로그인된 상태라면 로그아웃하고 메인 페이지로 이동
        alert('이미 로그인되어 있습니다.');
        navigate('/main_page'); // 메인 페이지로 이동
      }
    };

    checkLoggedIn();
  }, []);

  const onClickConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert('로그인에 실패했습니다.');
        console.log(error);
      } else if (data) {
        alert('로그인 되었습니다.');

        sessionStorage.setItem('loggedUserEmail', email); // 로그인 하면 sessionStorage에 email이 저장됨
        navigate('/main_page'); // 로그인 성공 시 대시보드 페이지로 이동
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //이메일 유효성과 비밀번호 유효성이 바꼈을때 둘다 유효한 경우만 login버튼 활성화 해주는 기능
    if (emailValid && pwValid) setNotAllow(false);
    else setNotAllow(true);
    return;
  }, [emailValid, pwValid]);

  const handleEmail = (e) => {
    //이메일 값을 value에 state
    setEmail(e.target.value);
    const regex = //이메일 유효성검사 하기위한 객체
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePW = (e) => {
    //위와 마찬가지 비밀번호인 경우
    setPw(e.target.value);
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  return (
    //클래스를 설정할땐 styles객체안에 있는 값을 참조하는 방식
    <div>
      <IDBackground text="Login">
        {loading ? (
          <div
            style={{
              fontSize: '80px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              top: '290px',
              position: 'absolute',
            }}
          >
            <FaSpinner className={styles.loadingIcon} />
          </div>
        ) : (
          <form>
            <div className={styles.Login}>
              <div>
                {!emailValid &&
                  email.length > 0 && ( //이메일이 유효하지 않고 이메일을 입력하기 시작하면 에러 메세지가 뜸
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
                {!pwValid && password.length > 0 && (
                  <div>영문, 숫자 포함 8~10자 입력해주세요</div> //비밀번호가 유효하지 않고 비밀번호를 입력하기 시작하면 에러 메세지가 뜸
                )}
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={handlePW}
                  placeholder="Enter your password"
                />
              </div>
              <button
                onClick={onClickConfirm}
                disabled={notAllow}
                type="submit"
              >
                <strong>Login</strong>
              </button>
            </div>
          </form>
        )}
      </IDBackground>
      <div className={styles.FindnSign}>
        <button
          onClick={() => {
            navigate('/findpw');
          }}
          id="find_pw_button"
        >
          Find
        </button>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <button
          onClick={() => {
            navigate('/join');
          }}
          id="join"
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default Login;

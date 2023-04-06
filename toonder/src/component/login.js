import React from 'react';
import styles from '../style.css';
import JoinFindBtn from './joinFindBtn';
import IDBackground from './ID_background';

function Login() {
  return (
    <div>
      <IDBackground text="Login">
        <div className="findid_body">
          <form>
            <input id="enter_name" type="text" placeholder="Enter your ID" />
            <input
              id="enter_id"
              type="text"
              placeholder="Enter your password"
            />
            <button type="submit">
              <strong>Login</strong>
            </button>
          </form>
        </div>
      </IDBackground>
      <JoinFindBtn />
    </div>
  );
}

export default Login;

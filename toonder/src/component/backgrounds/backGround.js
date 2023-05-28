import React from 'react';
import styles from './backGround.module.css';
import logo from '../../images/logoimage.png';
import { Link } from 'react-router-dom';
//
function Background(props) {
  return (
    <div
      className={styles.background}
      style={{ backgroundSize: props.backgroundSize }} //백그라운드 사이즈를 props 객체로 전달해서 컴포넌트마다 사이즈를 조정해서 사용가능
    >
      <div
        className={styles.logo}
        style={
          {
            top: props.top,
            left: props.left,
          } /*로고 위치도 props로 전달받아 컴포넌트마다 위치를 조장해서 사용가능 */
        }
      >
        <img src={logo} width="84px" height="93px" alt="image error" />
        <strong>{props.text}</strong>
      </div>
      {props.children} {/* props.children 렌더링 */}
    </div>
  );
}

export default Background;

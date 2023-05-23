import React from 'react';
import styles from '../style.css';
import logo from '../../images/logoimage.png';
import { Link } from 'react-router-dom';

function IDBackground(props) {
  return (
    <div className="id_background">
      <div className="find_logo">
        <img src={logo} width="84px" height="93px" alt="image error" />
        <strong>{props.text}</strong>
      </div>
      {props.children} {/* props.children 렌더링 */}
    </div>
  );
}

export default IDBackground;

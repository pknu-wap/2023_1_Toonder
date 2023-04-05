import React from "react";
import styles from '../style.css';
import logo from "../images/logoimage.png"
import { Link } from "react-router-dom";

function FindidBackground(props) {
  return (
    <div className="find_background">
      <div className="find_logo">
        <img src={logo} width="84px" height="93px" alt="image error"/><strong>Find ID</strong>
      </div>
      {props.children} {/* props.children 렌더링 */}
    </div>
  );
}

export default FindidBackground;
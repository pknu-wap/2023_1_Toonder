import React from "react";
import styles from './style.css';
import logo from "./images/logoimage.png"

function Findid() {
  return (
    <div className="findid">
        <div class="find_logo">
            <img src={logo} width="84px" height="93px" alt="image error"/><strong>Find ID</strong>
        </div>
        <div className="findid_body">
            <form>
            <input id="enter_name" type="text" placeholder="Enter your name" />
            <input id="enter_id" type="text" placeholder="Enter your ID" />
            <button type="submit"><strong>Find</strong></button>
            </form>
        </div>
    </div>
  );
}

export default Findid;

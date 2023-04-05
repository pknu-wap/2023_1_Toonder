import React from "react";
import styles from '../style.css';
import FindidBackground from "./findid_background";
import logo from "../images/logoimage.png"

function Findid() {
  return (
    <FindidBackground>
      <div className="findid_body">
        <form>
          <input id="enter_name" type="text" placeholder="Enter your name" />
          <input id="enter_id" type="text" placeholder="Enter your ID" />
          <button type="submit"><strong>Find</strong></button>
        </form>
      </div>
    </FindidBackground>
  );
}

export default Findid;

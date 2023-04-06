import React from "react";
import styles from '../style.css';
import IDBackground from "./ID_background";

function Findid() {
  return (
    <IDBackground>
      <div className="findid_body">
        <form>
          <input id="enter_name" type="text" placeholder="Enter your name" />
          <input id="enter_id" type="text" placeholder="Enter your ID" />
          <button type="submit"><strong>Find</strong></button>
        </form>
      </div>
    </IDBackground>
  );
}

export default Findid;

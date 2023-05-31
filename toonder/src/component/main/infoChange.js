import React from 'react';
import "./mainPage.css";
import logo from '../../images/logoimage.png';
import { Link } from 'react-router-dom';

function InfoChange(props) {
  return (
    <div className="infoChange">
      <div className="logo">
        <img src={logo} width="84px" height="93px" alt="image error" />
        <h5>Info change</h5>
      </div>
      <div className='changeMain'>
            <form>
                <h6>이름 변경</h6>
                <div id='namechange'>
                    <input id='givenname' placeholder='이름'></input>
                    <input id='familyname' placeholder='성'></input>
                </div>
                <h6>비밀번호 변경</h6>
                <div id='pwchange'>
                    <h6>hannalee405@gmail.com</h6>
                    <button type='submit' id='sendcode'>Send Code</button>
                </div>

                <h6>선호 장르 변경</h6>
                <div id='genrechange'>
                    <textarea ></textarea>
                </div>
                <button type='submit' id='infochange'>Info change</button>

            </form>
      </div>
    </div>
  );
}

export default InfoChange;

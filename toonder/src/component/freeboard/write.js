import React,{useState, useEffect} from 'react';
import "./freeboard.css";
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';


function Write() {
  return (
    <MainBackgorund>
        <div className='writeboard'>
          <h2>글쓰기</h2>
          <input className='title' type='text' placeholder='제목을 작성해주세요'></input>
          <textarea type="text" placeholder='내용을 작성해주세요.'></textarea>
        </div>
        <button id="save" type='submit'>저장</button>
    </MainBackgorund>
  );
}

export default Write;
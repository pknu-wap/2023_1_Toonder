import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./freeboard.css";
import MainBackgorund from '../backgrounds/mainBackground';

function PostView() {
  return (
    <MainBackgorund>
      <div className='writeboard'>
        <h2>자유게시판</h2>
        <div id="postinfo">
          <h1>제목</h1>
          <h4>이름 | 조회수 | YYYY.MM.DD | <a>수정</a> | <a>삭제</a></h4>
        </div>
        <div id="postcontent">
          <p>내용</p>
        </div>
        <div id="repl">
          <h3>댓글</h3>
        </div>
      </div>
    </MainBackgorund>
  )
}

export default PostView;
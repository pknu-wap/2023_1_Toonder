import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './freeboard.css';
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';

function PostView() {
  const location = useLocation();
  const brdNo = location.state?.brdNo;
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/toonder/board/${brdNo}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
        alert('게시글을 불러오지 못했습니다.');
      }
    };

    fetchData();
  }, []);

  if (!post) {
    return null;
  } //비동기로 데이터를 가져오는 과정에서 데이터가 아직 존재하지 않을 때의 상태를 처리

  const { brdTitle, brdContent, mem_name, brdRegDate, brdViewCount } = post;
  const formattedDate = brdRegDate.split('T')[0];

  return (
    <MainBackgorund>
      <div className="writeboard">
        <br />
        <h2>자유게시판</h2>
        <br />
        <div id="postinfo">
          <h1>{brdTitle}</h1>
          <br />
          <h4>
            {mem_name} | {brdViewCount} | {formattedDate} | <a>수정</a> |{' '}
            <a>삭제</a>
          </h4>
        </div>
        <div id="postcontent">
          <p>{brdContent}</p>
        </div>
        <div id="repl">
          <h3>댓글</h3>
        </div>
      </div>
    </MainBackgorund>
  );
}

export default PostView;

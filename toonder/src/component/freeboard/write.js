import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './freeboard.css';
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const loggedUserName = localStorage.getItem('loggedUserName');
  const email = sessionStorage.getItem('loggedUserEmail');
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('제목과 내용을 작성해주세요.');
      return;
    }

    const requestData = {
      brdTitle: title,
      brdContent: content,
      mem_name: loggedUserName,
      mem_email: email,
    };

    try {
      await axios.post('/toonder/board', requestData);
      alert('글이 저장되었습니다.');
      navigate(-1);
    } catch (error) {
      console.log(error);
      alert('글을 저장하지 못했습니다.');
    }
  };

  return (
    <MainBackgorund>
      <div className="writeboard">
        <h2>글쓰기</h2>
        <input
          className="title"
          type="text"
          placeholder="제목을 작성해주세요"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="내용을 작성해주세요."
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
      <button id="save" type="submit" onClick={handleSubmit}>
        저장
      </button>
    </MainBackgorund>
  );
}

export default Write;

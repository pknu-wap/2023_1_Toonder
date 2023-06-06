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

  const addConvertLine = (text) => {
    return text.replace(/\n/g, '@d`}');
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('제목과 내용을 작성해주세요.');
      return;
    }

    const requestData = {
      brdTitle: title,
      brdContent: addConvertLine(content),
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
        <br />
        <h2>글쓰기</h2>
        <br />
        <input
          style={{ fontSize: '20px' }}
          className="title"
          type="text"
          placeholder="제목을 작성해주세요"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          style={{ fontSize: '17px' }}
          placeholder="내용을 작성해주세요."
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
      <div style={{ position: 'relative' }}>
        <button
          id="save"
          style={{
            position: 'absolute',
            fontSize: '20px',
            height: '36px',
            color: 'rgb(255, 147, 147)',
            display: 'flex',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '22px',
            width: '80px',
            borderRadius: '10px',
            top: '-690px',
            right: '65px',
          }}
          type="submit"
          onClick={handleSubmit}
        >
          저장
        </button>
      </div>
    </MainBackgorund>
  );
}

export default Write;

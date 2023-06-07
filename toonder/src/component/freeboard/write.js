import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './freeboard.css';
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';
import supabase from '../supabase';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loggedUserName, setLoggedUserName] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const session = data.session;

      if (session === null) {
        alert('로그인을 먼저 해주세요.');
        navigate('/');
      } else {
        const email = session.user.email;
        setEmail(email);

        const rdata = {
          email: email,
        };

        axios
          .post('toonder/name', rdata)
          .then((loggedUserData) => {
            setLoggedUserName(loggedUserData.data.mem_name);
          })
          .catch((error) => console.log(error));
      }
    };
    fetchData();
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const addConvertLine = (text) => {
    return text.replace(/\n/g, '@d`}');
  };
  //서브밋
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

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './freeboard.css';
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';
import supabase from '../supabase';
function Edit() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loggedUserName, setLoggedUserName] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const brdNo = location.state?.brdNo;

  useEffect(() => {
    document.title = 'Toonder 게시글수정';
  }, []);

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

        try {
          const response = await axios.get(`/toonder/board/${brdNo}`);
          const postData = response.data;
          setTitle(postData.brdTitle);
          setContent(convertLineForTextarea(postData.brdContent));
          if (postData.mem_email !== email) {
            alert('본인의 게시글만 수정이 가능합니다.');
            navigate(-1);
          }
        } catch (error) {
          console.log(error);
          alert('게시글을 불러오지 못했습니다.');
          navigate(-1);
        }
      }
    };
    fetchData();
  }, []);

  const convertLineForTextarea = (text) => {
    return text.replaceAll('@d`}', '\n');
  };

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

    try {
      const addLineContent = addConvertLine(content);
      await axios.put(`/toonder/board/${brdNo}`, {
        brdTitle: title,
        brdContent: addLineContent,
        mem_name: loggedUserName,
        mem_email: email,
      });
      alert('게시글이 수정되었습니다.');
      navigate(-1);
    } catch (error) {
      console.log(error);
      alert('게시글 수정이 실패했습니다.');
      navigate(-1);
    }
  };

  return (
    <MainBackgorund>
      <div className="writeboard">
        <br />
        <h2>수정하기</h2>
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

export default Edit;

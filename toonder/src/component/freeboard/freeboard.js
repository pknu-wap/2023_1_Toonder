import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './freeboard.css';
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';

function Freeboard() {
  const navigate = useNavigate();
  const [loggedUserName, setLoggedUserName] = useState('지금 로그인하세요!');
  const email = sessionStorage.getItem('loggedUserEmail');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/toonder/board');
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainBackgorund>
      <div className="mainboard">
        <br />
        <h2>자유게시판</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.brdNo}>
              <div className="link-wrapper">
                <Link to={`/postview/${post.brdNo}`}> {post.brdTitle} </Link>
                <div className="meta">
                  <span>{post.mem_name}</span>
                  <span>|</span>
                  <span>{post.brdViewCount}</span>
                  <span>|</span>
                  <span>{post.brdRegDate.split('T')[0]}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="subbuttons">
        <div className="pagination">
          <a href="#">&lt;&lt;</a>
          <a href="#">&lt;</a>
          <a className="active" href="#">
            1
          </a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">&gt;</a>
          <a href="#">&gt;&gt;</a>
        </div>
        <button
          id="freewrite"
          onClick={() => {
            navigate('/write');
          }}
        >
          글쓰기
        </button>
      </div>
    </MainBackgorund>
  );
}

export default Freeboard;

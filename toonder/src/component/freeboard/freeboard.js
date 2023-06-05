import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './freeboard.css';
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';

function Freeboard() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('loggedUserEmail');
  const [posts, setPosts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/toonder/board?p_num=${pageNum}`);
        setPosts(response.data);
        console.log(response.data);

        let total = pageNum;
        let hasMorePages = true;

        while (hasMorePages) {
          const response = await axios.get(`/toonder/board?p_num=${total + 1}`);
          if (response.data.length === 0) {
            hasMorePages = false;
          } else {
            total++;
          }
        }

        setTotalPages(total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pageNum]);

  const goToPage = (page) => {
    setPageNum(page);
  };

  const goToPrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNum < totalPages) {
      setPageNum(pageNum + 1);
    }
  };

  const goToFirstPage = () => {
    setPageNum(1);
  };

  const goToLastPage = () => {
    setPageNum(totalPages);
  };

  const paginationButtons = [];
  const maxPageButtons = Math.min(totalPages, 5);

  let startPage = Math.max(1, pageNum - 2);
  if (startPage + maxPageButtons > totalPages) {
    startPage = totalPages - maxPageButtons + 1;
  }

  for (let i = startPage; i < startPage + maxPageButtons; i++) {
    paginationButtons.push(
      <a
        href="#"
        className={pageNum === i ? 'active' : ''}
        onClick={() => goToPage(i)}
      >
        {i}
      </a>
    );
  }

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
          <a href="#" onClick={goToFirstPage}>
            &lt;&lt;
          </a>
          <a href="#" onClick={goToPrevPage}>
            &lt;
          </a>
          {paginationButtons}
          <a href="#" onClick={goToNextPage}>
            &gt;
          </a>
          <a href="#" onClick={goToLastPage}>
            &gt;&gt;
          </a>
        </div>
      </div>
      <button
        id="freewrite"
        onClick={() => {
          navigate('/write');
        }}
      >
        글쓰기
      </button>
    </MainBackgorund>
  );
}

export default Freeboard;

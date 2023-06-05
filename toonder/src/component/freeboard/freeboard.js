import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './freeboard.css';
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

function Freeboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/toonder/board?p_num=${pageNum}`);
        setPosts(response.data);
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
        setLoading(false);
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
        {loading ? (
          <div
            style={{
              fontSize: '120px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              top: '30%',
            }}
          >
            <FaSpinner className="loadingIcon" />
          </div>
        ) : (
          <>
            <h2>자유게시판</h2>
            <ul>
              {posts.map((post) => (
                <li key={post.brdNo}>
                  <div className="link-wrapper">
                    <a
                      onClick={() => {
                        navigate('/postview', {
                          state: { brdNo: post.brdNo },
                        });
                      }}
                    >
                      {post.brdTitle}
                    </a>
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
            <button
              id="freewrite"
              onClick={() => {
                navigate('/write');
              }}
            >
              글쓰기
            </button>
          </>
        )}
      </div>
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
    </MainBackgorund>
  );
}

export default Freeboard;

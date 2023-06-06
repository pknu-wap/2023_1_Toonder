import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainBackground from '../backgrounds/mainBackground';
import styles from './postview.module.css';

function PostView() {
  // 라우터
  const navigate = useNavigate();
  const location = useLocation();
  const brdNo = location.state?.brdNo;

  // state
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const email = sessionStorage.getItem('loggedUserEmail');
  const [editedComment, setEditedComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState('');
  const [comment, setComment] = useState('');
  const [isCommentDelete, setIsCommentDelete] = useState(false);
  // 게시글 불러오기
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
  }, [brdNo]);

  // 댓글 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/toonder/board/${brdNo}/comment`);
        setComments(response.data);
      } catch (error) {
        console.log(error);
        alert('댓글을 불러오지 못했습니다.');
      } finally {
        setIsCommentDelete(false);
      }
    };

    fetchComments();
  }, [brdNo, isCommentDelete]);

  // 게시글 삭제
  const handleDelete = async () => {
    try {
      await axios.delete(`/toonder/board/${brdNo}`, {
        data: { mem_email: email },
      });
      alert('삭제가 성공했습니다.');
      navigate('/freeboard');
    } catch (error) {
      console.log(error);
      alert('삭제가 실패했습니다.');
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (cmtContent, cmtBno) => {
    try {
      await axios.delete(`/toonder/board/${brdNo}/comment/${cmtBno}`, {
        data: { cmtContent: cmtContent, mem_email: email },
      });
      alert('댓글이 삭제되었습니다.');
      setIsCommentDelete(true);
    } catch (error) {
      console.log(error);
      alert('본인의 댓글만 수정이 가능합니다.');
    }
  };

  // 댓글 수정
  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedComment(content);
  };

  // 댓글 수정 보내기
  const handleSubmitEditedComment = async (commentId) => {
    if (!editedComment) {
      alert('댓글을 입력하세요.');
      return;
    }

    try {
      await axios.put(`/toonder/board/${brdNo}/comment/${commentId}`, {
        cmtContent: editedComment,
        mem_email: email,
      });
      alert('댓글이 수정되었습니다.');
      setEditingCommentId(null);
      setEditedComment('');

      const response = await axios.get(`/toonder/board/${brdNo}/comment`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
      alert('본인의 댓글만 수정이 가능합니다.');
      setEditingCommentId(null);
    }
  };

  // 댓글 보내기
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!comment) {
      alert('댓글을 입력하세요.');
      return;
    }
    const name = localStorage.getItem('loggedUserName');
    try {
      await axios.post(`/toonder/board/${brdNo}/comment`, {
        cmtContent: comment,
        mem_name: name,
        mem_email: email,
      });
      alert('댓글이 작성되었습니다.');
      setComment('');

      const response = await axios.get(`/toonder/board/${brdNo}/comment`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  // 게시글 목록을 불러오고나서 랜딩하기 위함
  if (!post) {
    return null;
  }

  const { brdTitle, brdContent, mem_name, brdRegDate, brdViewCount } = post;
  const formattedDate = brdRegDate.split('T')[0];

  return (
    <MainBackground>
      <div className="postboard">
        <br />
        <h2>자유게시판</h2>
        <br />
        <div id="postinfo">
          <h1>{brdTitle}</h1>
          <br />
          <h4>
            {mem_name} | {brdViewCount} | {formattedDate} | <a>수정</a> |{' '}
            <a onClick={handleDelete}>삭제</a>
          </h4>
        </div>
        <div id="postcontent">
          <h3>[내용]</h3>
          <br />
          <br />
          <p>&nbsp;&nbsp;{brdContent}</p>
        </div>
        <div id="repl">
          <h3>[댓글]</h3>
          <br />
          {comments.map((comment) => (
            <div key={comment.cmtNo}>
              <br />
              {editingCommentId === comment.cmtNo ? (
                <>
                  &nbsp;&nbsp;
                  <input
                    className={styles.editedCommentInput}
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  ></input>
                  <div className={styles.metaDataWrap}>
                    <div className={styles.metaData}>
                      <a
                        onClick={() => handleSubmitEditedComment(comment.cmtNo)}
                      >
                        수정 완료
                      </a>{' '}
                      |{' '}
                      <a onClick={() => setEditingCommentId(null)}>수정 취소</a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  &nbsp;&nbsp;{comment.memName} :{comment.cmtContent}
                  <div className={styles.metaDataWrap}>
                    <p className={styles.metaData}>
                      {comment.cmtRegDate.split('T')[0]} |{' '}
                      <a
                        onClick={() =>
                          handleEditComment(comment.cmtNo, comment.cmtContent)
                        }
                      >
                        수정
                      </a>{' '}
                      |{' '}
                      <a
                        onClick={() =>
                          handleDeleteComment(comment.cmtContent, comment.cmtNo)
                        }
                      >
                        삭제
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div id="commentwrite">
          <form onSubmit={handleSubmitComment}>
            <input
              className={styles.commentInput}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 작성하세요"
            />
            <div className={styles.commentSubmit}>
              <a
                style={{
                  position: 'absolute',
                  fontSize: '24px',
                }}
                type="submit"
                onClick={handleSubmitComment}
              >
                작성
              </a>
            </div>
          </form>
        </div>
      </div>
    </MainBackground>
  );
}

export default PostView;

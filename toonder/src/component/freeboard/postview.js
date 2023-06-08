import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainBackground from '../backgrounds/mainBackground';
import styles from './postview.module.css';
import supabase from '../supabase';
function PostView() {
  // 라우터
  const navigate = useNavigate();
  const location = useLocation();
  const brdNo = location.state?.brdNo;

  // state
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [email, setEmail] = useState();
  const [editedComment, setEditedComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState('');
  const [comment, setComment] = useState('');
  const [isCommentDelete, setIsCommentDelete] = useState(false);
  const [isClickCommentLike, setIsClickCommentLike] = useState(false);
  //줄바꿈기능
  const convertLine = (text) => {
    return text.split('@d`}').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  const convertLineForTextarea = (text) => {
    return text.replaceAll('@d`}', '\n');
  };

  const addConvertLine = (text) => {
    return text.replace(/\n/g, '@d`}');
  };

  useEffect(() => {
    document.title = 'Toonder 자유게시판';
  }, []);

  //이메일 불러오기
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
      }
    };
    fetchData();
  }, []);

  // 게시글 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/toonder/board/${brdNo}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
        alert('게시글을 불러오지 못했습니다.');
      } finally {
      }
    };

    fetchData();
  }, [brdNo]);

  const handleEditContent = () => {
    if (post.mem_email !== email) {
      alert('본인의 게시글만 수정이 가능합니다.');
      return;
    } else {
      navigate('/edit', {
        state: { brdNo: post.brdNo },
      });
    }
  };

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
        setIsClickCommentLike(false);
      }
    };

    fetchComments();
  }, [brdNo, isCommentDelete, isClickCommentLike]);

  //댓글 좋아요
  const handleLikeComment = async (cmtNo) => {
    try {
      const headers = {
        mem_email: email,
      };
      await axios.post(`/toonder/board/${brdNo}/comment/${cmtNo}/like`, null, {
        headers,
      });
      alert('댓글 좋아요가 반영되었습니다.');
    } catch (error) {
      console.log(error);
      alert('좋아요가 실패 했습니다.');
    }
  };

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
      alert('본인의 게시글만 삭제가 가능합니다.');
    }
  };

  //게시글 좋아요
  const handleLike = async () => {
    try {
      const headers = {
        mem_email: email,
      };
      await axios.post(`/toonder/board/${brdNo}/like`, null, {
        headers,
      });
      alert('좋아요가 반영되었습니다.');
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert('좋아요가 실패 했습니다.');
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
      const addLineComment = addConvertLine(editedComment);
      await axios.put(`/toonder/board/${brdNo}/comment/${commentId}`, {
        cmtContent: addLineComment,
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
      const addLineComment = addConvertLine(comment);
      await axios.post(`/toonder/board/${brdNo}/comment`, {
        cmtContent: addLineComment,
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

  const { brdTitle, brdContent, mem_name, brdRegDate, brdViewCount, brdLike } =
    post;
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
            {mem_name} &nbsp;|&nbsp; 조회수 : {brdViewCount} &nbsp;|&nbsp;{' '}
            {formattedDate} &nbsp;|&nbsp; 좋아요 : {brdLike}
            <div className={styles.contentButtons}>
              <button
                onClick={() => {
                  handleLike();
                }}
              >
                ☺︎
              </button>{' '}
              &nbsp;|&nbsp;{' '}
              <button
                onClick={() => {
                  handleEditContent();
                }}
              >
                수정
              </button>{' '}
              &nbsp;|&nbsp; <button onClick={handleDelete}>삭제</button>
            </div>
          </h4>
        </div>
        <div id="postcontent">
          <h3>[내용]</h3>
          <div
            style={{
              borderTop: '1px solid rgb(255, 147, 147)',
              width: '100%',
              margin: '10px 0',
            }}
          />
          <br />
          <p>{convertLine(brdContent)}</p>
        </div>
        <div id="repl2">
          <h3>[댓글]</h3>
          <div
            style={{
              borderTop: '1px solid rgb(255, 147, 147)',
              width: '100%',
              margin: '10px 0',
            }}
          />
          {comments.map((comment) => (
            <div key={comment.cmtNo}>
              <br />
              {editingCommentId === comment.cmtNo ? (
                <>
                  &nbsp;&nbsp;
                  <textarea
                    className={styles.editedCommentInput}
                    value={convertLineForTextarea(editedComment)}
                    onChange={(e) => setEditedComment(e.target.value)}
                  ></textarea>
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
                  {' '}
                  {comment.memName}
                  <div className={styles.wrapContent}>
                    : {convertLine(comment.cmtContent)}
                  </div>
                  <div className={styles.metaDataWrap}>
                    <p className={styles.metaData}>
                      {comment.cmtRegDate.split('T')[0]} &nbsp;|&nbsp; 좋아요 :{' '}
                      {comment.cmtLike}
                      <div className={styles.commentClicker}>
                        <button
                          onClick={() => {
                            handleLikeComment(comment.cmtNo);
                            setIsClickCommentLike(true);
                          }}
                        >
                          ☺︎
                        </button>{' '}
                        |{' '}
                        <button
                          onClick={() =>
                            handleEditComment(comment.cmtNo, comment.cmtContent)
                          }
                        >
                          수정
                        </button>{' '}
                        |{' '}
                        <button
                          onClick={() =>
                            handleDeleteComment(
                              comment.cmtContent,
                              comment.cmtNo
                            )
                          }
                        >
                          삭제
                        </button>{' '}
                      </div>
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div id="commentwrite">
          <form onSubmit={handleSubmitComment}>
            <textarea
              className={styles.commentInput}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 작성하세요"
            ></textarea>
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

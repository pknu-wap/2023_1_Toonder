import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './backGround.module.css';
import userImage from '../../images/userImage.png';
import axios from 'axios';
import supabase from '../supabase';


function MainBackSmall(props) {
  const navigate = useNavigate();
  const [loggedUserName, setLoggedUserName] = useState(
    localStorage.getItem('loggedUserName')
  );
  const [loggedUserImage, setLoggedUserImage] = useState(
    localStorage.getItem('loggedUserPhoto') || userImage
  );
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getSession();
      const email = data.session.user.email;
      const requestData = {
        email: email,
      };

      if (!localStorage.getItem('loggedUserName')) {
        axios
          .post('toonder/name', requestData)
          .then((loggedUserData) => {
            console.log(loggedUserData.data.mem_name);
            setLoggedUserName(loggedUserData.data.mem_name);
            localStorage.setItem(
              'loggedUserName',
              loggedUserData.data.mem_name
            );
          })
          .catch((error) => console.log(error));
      }

      if (!localStorage.getItem('loggedUserPhoto')) {
        axios
          .post('toonder/photo', requestData)
          .then((loggedUserData) => {
            console.log(loggedUserData.data.mem_photo);
            setLoggedUserImage(loggedUserData.data.mem_photo);
            localStorage.setItem(
              'loggedUserPhoto',
              loggedUserData.data.mem_photo
            );
          })
          .catch((error) => console.log(error));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mainBackSmall">
      <div className="mainInfo">
        <div onClick={openModal}>
          <img id="infoimg" src={loggedUserImage} alt="image error" />
        </div>
        <h2 style={{ color: 'white' }}>{loggedUserName}</h2>
        <button
          id="changeInfo"
          onClick={() => {
            navigate('/infochange');
          }}
        >
          <h3>정보수정</h3>
        </button>
      </div>
      <div className="mainButtonSet">
        <button
          id="webtoonList"
          onClick={() => {
            navigate('/mainWebtoonList');
          }}
        >
          웹툰 목록
        </button>
        <button
          id="mypage"
          onClick={() => {
            navigate('/mypage');
          }}
        >
          마이페이지
        </button>
        <button
          id="freeBoard"
          onClick={() => {
            navigate('/freeboard');
          }}
        >
          자유게시판
        </button>
        <button
          id="logOut"
          onClick={async () => {
            localStorage.removeItem('loggedUserPhoto');
            localStorage.removeItem('loggedUserName');
            localStorage.removeItem('loggedUserHashTag');
            sessionStorage.removeItem('loggedUserEmail'); // 세션 스토리지에서 loggedUserEmail 제거
            alert('로그아웃 되었습니다.');
            await supabase.auth.signOut();
            navigate('/');
          }}
        >
          로그아웃
        </button>
      </div>
      {modalOpen && (
        <ModalBasic
          setModalOpen={setModalOpen}
          setLoggedUserImage={setLoggedUserImage}
          openModal={openModal}
        />
      )}
      {props.children}
    </div>
  );
}

function ModalBasic({ setModalOpen, setLoggedUserImage, openModal }) {
  const [selectedImage, setSelectedImage] = useState(
    localStorage.getItem('loggedUserPhoto') || userImage
  );
  const [newImage, setNewImage] = useState(null);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setNewImage(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (newImage) {
      console.log('새 이미지 저장:', newImage);

      const { data } = await supabase.auth.getSession();
      axios
        .post('toonder/photo/update', {
          email: data.session.user.email,
          image: selectedImage,
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));

      localStorage.setItem('loggedUserPhoto', selectedImage);
      setLoggedUserImage(selectedImage);
    }

    closeModal();
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div className="profilechangeback">
      <div className="profilechange" ref={modalRef}>
        <img id="changeinfoimg" src={selectedImage} alt="image error" />
        <div id="changeFile">
          <label htmlFor="chooseFile">
            <h3>프로필 사진 변경</h3>
          </label>
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type="file"
            id="chooseFile"
            name="chooseFile"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              position: 'absolute',
              right: '-200px',
              top: '0px',
              marginTop: '10px',
            }}
          />
        </div>
        <div id="changeButtonSet" style={{ marginTop: '25px' }}>
          <button id="submitButton" type="submit" onClick={handleSave}>
            <h3>저장</h3>
          </button>
          <br />
          <button id="cancel" onClick={closeModal}>
            <h3>취소</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainBackSmall;

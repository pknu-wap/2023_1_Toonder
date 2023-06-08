import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './mainPage.css';
import MainBackgorund from '../backgrounds/mainBackground';
import axios from 'axios';
import supabase from '../supabase';
import ex1 from '../../images/ex1.png';

function Mypage() {
  useEffect(() => {
    document.title = 'Toonder 마이페이지';
  }, []);
  const navigate = useNavigate();
  const [loggedUserName, setLoggedUserName] = useState(
    localStorage.getItem('loggedUserName')
  );
  const [loggedUserHashTag, setLoggedUserHashTag] = useState(
    localStorage.getItem('loggedUserHashTag')
  );
  const [modalOpen, setModalOpen] = useState(false);

  const [loggedUserImage, setLoggedUserImage] = useState(
    localStorage.getItem('loggedUserPhoto') || ex1
  );
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

      axios
        .post('toonder/mypage', requestData)
        .then((hashData) => {
          console.log(hashData.data.mem_hashtag);
          setLoggedUserHashTag(hashData.data.mem_hashtag);
          localStorage.setItem('loggedUserHashTag', hashData.data.mem_hashtag);
        })
        .catch((error) => console.log(error));

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
    };

    fetchData();
  }, []);

  return (
    <MainBackgorund>
      <div className="mainUserInfo">
        <div className="mainInfo">
          <div onClick={openModal}>
            <img id="infoimg" src={loggedUserImage} alt="image error" />
          </div>
          <h2>{loggedUserName}</h2>
          <button
            id="changeInfo"
            onClick={() => {
              navigate('/infochange');
            }}
          >
            <h3>정보수정</h3>
          </button>
        </div>

        <h1>{loggedUserHashTag}</h1>
      </div>

      <div className="subUserInfo">
        <div className="myReview">
          <h2>나의 리뷰</h2>
          <section>
            <h4>유미의 세포들</h4>
            <ul>
              <li>
                사람의 감정과 이성의 중도를 너무 간결하게 이해시켜주는 작품인 거
                같습니다!
              </li>
            </ul>
          </section>
        </div>
        <div className="myPost">
          <h2>나의 자유게시판 글</h2>
          <section>
            <ul>
              <li>원주민 공포만화 관련 정보 올려주세요!</li>
            </ul>
          </section>
        </div>
      </div>
      <div>
        {modalOpen && (
          <ModalBasic
            setModalOpen={setModalOpen}
            setLoggedUserImage={setLoggedUserImage}
            openModal={openModal}
          />
        )}
      </div>
    </MainBackgorund>
  );
}

function ModalBasic({ setModalOpen, setLoggedUserImage, openModal }) {
  const [selectedImage, setSelectedImage] = useState(
    localStorage.getItem('loggedUserPhoto') || ex1
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

export default Mypage;

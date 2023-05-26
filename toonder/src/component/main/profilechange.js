import React,{useState, useEffect} from 'react';
import { useNavigate , Link} from 'react-router-dom';
import "./mainPage.css";
import Mainpage from '../main/main_page';
import axios from 'axios';
import ex1 from '../../images/ex1.png';


function Profilechange() {
  const navigate = useNavigate();
  const [loggedUserName, setLoggedUserName] = useState('지금 로그인하세요!');
  useEffect(() => {
    axios
      .get('api/member/select/'+sessionStorage.getItem('loggedUserEmail'))
      .then(loggedUserData => {
        setLoggedUserName(loggedUserData.data.mem_name);
      })
      .catch(error => console.log(error))
  },[])

  return (
    <Mainpage>
          <div className='profilechangeback'>
            <div className='profilechange'>
                <img id='changeinfoimg' src={ex1} alt="image error"></img>
                <button id='changeInfo'
                onClick={() => {
                    navigate('/mypage');
                }}
                ><h3>프로필 사진 변경</h3></button>

                <button id='cancel'
                onClick={() => {
                    navigate('/main_page');
                }}
                ><h3>취소</h3></button>
              </div>
          </div>
    </Mainpage>
  );
}

export default Profilechange;
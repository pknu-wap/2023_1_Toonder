import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./mainPage.css";

import MainBackgorund from '../backgrounds/mainBackground';
import Modal from './modal';

import ex1 from "../../images/ex1.png"

import zero from "../../images/zero.png"
import one from "../../images/one.png"
import two from "../../images/two.png"
import three from "../../images/three.png"
import four from "../../images/four.png"
import five from "../../images/five.png"
import six from "../../images/six.png"
import seven from "../../images/seven.png"
import eight from "../../images/eight.png"
import nine from "../../images/nine.png"
import ten from "../../images/ten.png"

import MainBackSmall from '../backgrounds/mainBackSmall';
import axios from 'axios';
import supabase from '../supabase';

function MainWebtoonInfo() {
  
  const {state} = useLocation();
  const {mastrId} = state;

  const [webtoonImage, setWebtoonImage] = useState(ex1);
  const [webtoonTitle, setWebtoonTitle] = useState("");
  const [webtoonOutline, setWebtoonOutline] = useState("");
  const [webtoonAuthors, setWebtoonAuthors] = useState("");
  const [webtoonPlatform, setWebtoonPlatform] = useState("");
  const [webtoonGenre, setWebtoonGenre] = useState("");


  const [reviewList, setReviewList] = useState([])

  const [inputReviewText, setInputReviewText] = useState("")
  
  const [openModalForRegRating, setOpenModalForRefRating] = useState(false)
  const [regRateValue, setRegRateValue] = useState(5.0)
  const imageForRateStar = [zero,one,two,three,four,five,six,seven,eight,nine,ten]
  const rateToInteger = {0 : 0, 0.5 : 1, 1.0 : 2, 1.5 : 3,
    2.0 : 4, 2.5 : 5, 3.0 : 6, 3.5 : 7, 4.0 : 8, 4.5 : 9, 5.0 : 10}  

  const [openModalForConfirm, setOpenModalForConfirm] = useState(false)

  useEffect( () => {
    axios
      .get('toonder/webtoon/'+mastrId)
      .then(res => {
        console.log(mastrId)
        const webtoonInfo = res.data
        setWebtoonImage(webtoonInfo.imageDownloadUrl)
        setWebtoonTitle(webtoonInfo.title)
        setWebtoonOutline(webtoonInfo.outline)
        setWebtoonAuthors((webtoonInfo.sntncWritrNm === webtoonInfo.pictrWritrNm 
          || webtoonInfo.sntncWritrNm ==="" 
          || webtoonInfo.pictrWritrNm==="") ? 
          webtoonInfo.pictrWritrNm : webtoonInfo.sntncWritrNm + " / " + webtoonInfo.pictrWritrNm)
        setWebtoonPlatform(webtoonInfo.pltfomCdNm)
        setWebtoonGenre(webtoonInfo.mainGenreCdNm)
      })

      axios
      .get('toonder/webtoon/'+mastrId+'/review')
      .then(res=> {
        console.log(res.data)
        setReviewList(res.data)
      })

    },[])

    const handleRegReview = async () => {
      
      
      if (inputReviewText === ""){
           alert('리뷰를 등록하시려면 내용을 입력해주세요!')
      }
      else {
        setOpenModalForRefRating(true)         
      }

    }


    
    const handleReviewReg = () => {
      setOpenModalForRefRating(false) 

        
      if(window.confirm("리뷰를 등록하시겠습니까?")) {
          alert('리뷰가 등록되었습니다.')

          const sendingReviewData = {
            revContent : inputReviewText,
            revRating : regRateValue,
            memName : localStorage.getItem('loggedUserName'),
            mem_email : 'wkdghdwns19969@gmail.com',
          }

          console.log(sendingReviewData)

          axios.post('toonder/webtoon/'+mastrId+'/review',sendingReviewData)
            .then(res => console.log(res))
            .catch(error => console.log(error))

          setReviewList(reviewList.concat(sendingReviewData))
          setInputReviewText('')
        }
        setRegRateValue(5.0)
    }
    
    const handleChange = (event) => {
      console.log(event.target)
      setInputReviewText(event.target.value)
    }

    const closeModal = () => {
      setOpenModalForRefRating(false);
      setRegRateValue(5.0)
    }
    
  return (
    <>
    <div>
        {openModalForRegRating && (
          <Modal onSave = {handleReviewReg} onClose={closeModal}>
            <h1 style={{position:"relative", top:'-20%'}}>⭐별점 주기⭐</h1>
            <div style = {{display:'flex', flexDirection:'row'}}>
              <div onClick={() => {setRegRateValue(regRateValue-0.5 >=0 ? regRateValue-0.5 : 0)}} style={{marginRight:'10px'}}>-</div>
              <img style={{position:"relative", top:'-10%'}} src={imageForRateStar[rateToInteger[regRateValue]]} alt={regRateValue}/>
              <div onClick={() => {setRegRateValue(regRateValue+0.5 <=5 ? regRateValue+0.5 : 5)}}style={{marginLeft :'10px'}}>+</div>
            </div>
          </Modal>
        )}
      </div>

      <div>
        {openModalForConfirm && (
          <Modal onSave = {handleReviewReg} onClose={closeModal}>
            <h1 style={{position:"relative", top:'-20%'}}>리뷰를 등록하시겠습니까?</h1>
          </Modal>
        )}
      </div>  

    <MainBackgorund>
      <MainBackSmall>
      
      

      <div className='mainWebtoonInfo'>
        <div className='mainwtInfo'>
          <img src={webtoonImage} alt="image error" />
          <div className='subwtInfo'>
            <h1>웹툰 정보</h1>
            <div>
              <text style={{fontSize:'20px', position:'relative',top:'20px', right:'10%',color:'white'}}>
                <strong>" {webtoonGenre} " </strong> 
                <a href={`https://www.youtube.com/results?search_query=${webtoonGenre} 관련 BGM`} target="_blank">
                  <text style ={{textDecorationLine : 'underline',fontSize : '15px'}}>장르에 대한 BGM 검색</text>
                </a>
              </text>
              
            </div>
            <ul>
              <div style={{marginTop : '-20px'}}>
                <li>제목 : {webtoonTitle}</li>
                <li>글 / 그림 : {webtoonAuthors}</li>
                <li>연재처 : {webtoonPlatform}</li>
              </div>
            </ul>
          </div>
        </div>

        <div className='mainStory'>
            <h1>줄거리</h1>
            <ul>
              <li>{webtoonOutline}</li>
            </ul>
        </div>
      </div>

      <div className='mainReview'>
        <h1>리뷰</h1>
        <section>
          <ul>
            {
              [...reviewList].reverse().map(review => (
                <li>{review.revContent} <img src={imageForRateStar[rateToInteger[review.revRating]]} alt = {review.revRating}/>   - {review.memName}</li>
              ))
            }
          </ul>
        </section>
        
          <input  id="reviewInputBox" type="text" value ={inputReviewText} onChange = {handleChange} placeholder='    리뷰를 달아보세요!' />
          
            
          <button onClick = {() => handleRegReview()} id="reviewRegButton">등록</button>
        
      </div>

      </MainBackSmall>
    </MainBackgorund>
    </>

  );

}
export default MainWebtoonInfo;
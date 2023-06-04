import React , {useRef, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./mainPage.css";
import axios from 'axios';
import MainBackgorund from '../backgrounds/mainBackground';
import ex1 from "../../images/ex1.png"
import ex2 from "../../images/ex2.png"
import ex3 from "../../images/ex3.png"
import ex4 from "../../images/ex4.png"
import ex5 from "../../images/ex5.png"
import ex6 from "../../images/ex6.png"
import ex7 from "../../images/ex7.png"
import ex8 from "../../images/ex8.png"
import toTop from "../../images/toTop.png"
import MainBackSmall from '../backgrounds/mainBackSmall';
import { FaSpinner } from 'react-icons/fa'; // 로딩 아이콘 추가

function MainWebtoonList() {
  const [webtoonList, setWebToonList] = useState([])
  const [countPage, setCountPage] = useState(1)
  const [firstLoading, setFirstLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  const [showNavigationToScrollTop, setShowNavigationToScrollTop] = useState(false)

  const navigate = useNavigate();

  function onScroll() {
    const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom =
        Math.ceil(window.scrollY + windowHeight) >= documentHeight;
      
        //console.log(window.scrollY)
      if (window.scrollY === 0) {
        setShowNavigationToScrollTop(false)
      }
      else {
        setShowNavigationToScrollTop(true)
      }

      if (scrolledToBottom) {
        setIsLoading(true)
        setCountPage(countPage+1)
      }
  }
  
  useEffect(()=> {
    //console.log(showNavigationToScrollTop)
    if (!isLoading){
      window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    };
    }
    
    
  })

  useEffect(() => {
    axios
      .get('toonder/webtoon?p_num='+countPage)
      .then(res => {
        if (webtoonList.length === 0){
          setIsLoading(false)
          setWebToonList(res.data)
          setFirstLoading(false)
        }
        else{
          setIsLoading(false)
          setWebToonList(webtoonList.concat(res.data))
        }
        
      })
  },[countPage])

  const listCreator = () => {
    var countForTrSplit = 1;
    var trWebtoonList = [];
    return(
      <>
      {firstLoading ? (
         <div
         style={{
           fontSize: '30px',
           color: 'white',
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           height: '60px',
         }}
       >
         <FaSpinner className="loadingIcon" />
       </div>
      ) : (
        <>
        <table>
          {
            webtoonList.map(
              (webtoonInfo) => {
                if (countForTrSplit === 1) {
                  trWebtoonList = []
                }
                
                trWebtoonList.push(webtoonInfo)
                if (countForTrSplit === 4){
                  countForTrSplit = 1;
                  return (
                    <tr>
                      
                      <tr>
                      {
                        trWebtoonList.map(trWebtoonInfo => (
                          <td>
                            <tr>
                              <td>
                                <button onClick={() => {navigate('/mainwebtooninfo', {state : {mastrId : trWebtoonInfo.mastrId}});}}>
                                  <img src={trWebtoonInfo.imageDownloadUrl} alt="image error" />
                                </button>  
                              </td>
                            </tr>
                            <tr style={{height:'65px'}}>
                              <td style={{height:'75px'}}>
                              <p className="webtoonTitle" 
                                style={{ fontSize: '18px', color: 'white', textAlign: 'center'}}>
                                {trWebtoonInfo.title}
                              </p>
                              </td>
                            </tr>
                          </td>   
                        ))
                      }
                      </tr>
                    </tr>
                    
                  )
                }
                else {
                  countForTrSplit += 1;
                }
              }
              )
          }
          
      </table>
      {isLoading ? ( // 로딩 중일 때의 화면
            <div
              style={{
                fontSize: '30px',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60px',
              }}
            >
              <FaSpinner className="loadingIcon" />
            </div>
          ) : (
            <div></div>
          )
          }

        </>
      )
        

      }
      
      
      </>
      
    );
  }

  return (
    <>
    <MainBackgorund>
        <MainBackSmall>
        <div className='mainWebtoonList'>
            {listCreator()}
        </div>
        
        {showNavigationToScrollTop ? (
          <div 
          onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}}
          style={{width:'50px',height:'50px',
          position:'fixed', bottom:'10%', right:'5%',opacity:'70%'}}>
            <img src={toTop} alt="To Top" style={{height:'100%', wigth:'100%'}}/>
        </div>):
        null}
        
      
      </MainBackSmall>
      
    </MainBackgorund>
    </>
  );
}


export default MainWebtoonList;
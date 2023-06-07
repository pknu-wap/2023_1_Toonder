import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './mainPage.css';
import axios from 'axios';
import MainBackgorund from '../backgrounds/mainBackground';
import toTop from '../../images/toTop.png';
import MainBackSmall from '../backgrounds/mainBackSmall';
import { FaSpinner } from 'react-icons/fa';

function Search(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTitle = queryParams.get('title');

  const [webtoonList, setWebToonList] = useState([]);
  const [countPage, setCountPage] = useState(1);
  const [firstLoading, setFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showNavigationToScrollTop, setShowNavigationToScrollTop] = useState(false);

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
        setCountPage(countPage+1)
        if (webtoonList.length === 0){
          setIsLoading(false)
          setWebToonList(res.data)
          setFirstLoading(false)
        }
        else{
          setIsLoading(false)
          setWebToonList(webtoonList.concat(res.data))
          console.log(countPage);
      }

      })
  },[countPage])

  const listCreator = () => {
    var countForTrSplit = 1;
    var trWebtoonList = [];
    return(
      <>
      {firstLoading ? (
         <div id='firstLoading'>
         <FaSpinner className="loadingIcon" />
       </div>
      ) : (
        <>
        <table>

          {
            webtoonList
              .filter((webtoonInfo) => webtoonInfo.title.includes(searchTitle))
              .map(
              (webtoonInfo) => {
                if (countForTrSplit === 1) {
                  trWebtoonList = []
                }

                trWebtoonList.push(webtoonInfo)
                if (countForTrSplit > 0){
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
                              <p className="webtoonTitle">
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
            <div id='isLoading'>
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
          <div id='showNavigationToScrollTop'
          onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}}>
            <img src={toTop} alt="To Top" style={{height:'100%', wigth:'100%'}}/>
        </div>):
        null}


      </MainBackSmall>

    </MainBackgorund>
    </>
  );
}

export default Search;

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import React, { useEffect,useState } from 'react';
import Findid from            './component/find/findid';
import Findpw from            './component/find/findpw';
import Findid_after from      './component/find/findid_after';
import Findpw_after from      './component/find/findpw_after';
import CheckPassword from      './component/find/check';

import Login from             './component/loginsiginin/login';
import Signin from            './component/loginsiginin/signIn';

import Mainpage from          './component/main/main_page';
import MainWebtoonList from   './component/main/mainWebtoonList';
import MainWebtoonInfo from   './component/main/mainWebtoonInfo'
import Mypage from            './component/main/mypage'

import MainBacksmall from     './component/backgrounds/mainBackSmall';
import Freeboard from         './component/freeboard/freeboard'

import Tag from               './component/tag';
import axios from 'axios';

function App() {

  //Test for Spring Data setting
  // useEffect(() => {
  //   axios
  //     .get('/api/hello')
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error));

  //   axios
  //     .get('/api/username')
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main_page" element={<Mainpage />} />
          <Route path="/findid" element={<Findid />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/findpw" element={<Findpw />} />
          <Route path="/check_password" element={<CheckPassword />} />
          <Route path="/findid_after" element={<Findid_after />} />
          <Route path="/findpw_after" element={<Findpw_after />} />
          <Route path="/mainWebtoonList" element={<MainWebtoonList />} />
          <Route path="/mainbackground" element={<MainBacksmall />} />
          <Route path="/mainwebtooninfo" element={<MainWebtoonInfo />} />
          <Route path="/freeboard" element={<Freeboard />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/123" element={<Tag />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

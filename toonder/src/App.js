import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './component/join/join';
import React, { useEffect, useState } from 'react';
import Newpw from './component/find/newpw';
import Findid from './component/find/findid';
import Findpw from './component/find/findpw';
import Login from './component/login/login';
import Mainpage from './component/main/main_page';
import Findid_after from './component/find/findid_after';
import MainWebtoonList from './component/main/mainWebtoonList';
import MainBacksmall from './component/backgrounds/mainBackSmall';
import MainWebtoonInfo from './component/main/mainWebtoonInfo';
import Mypage from './component/main/mypage';
import Freeboard from './component/freeboard/freeboard';
import InfoC from './component/main/infoChange';
import axios from 'axios';
import Profilechange from './component/main/profilechange';
import Practice from './component/practice';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main_page" element={<Mainpage />} />
          <Route path="/findid" element={<Findid />} />
          <Route path="/findpw" element={<Findpw />} />
          <Route path="/findid_after" element={<Findid_after />} />
          <Route path="/mainWebtoonList" element={<MainWebtoonList />} />
          <Route path="/mainbackground" element={<MainBacksmall />} />
          <Route path="/mainwebtooninfo" element={<MainWebtoonInfo />} />
          <Route path="/freeboard" element={<Freeboard />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/infochange" element={<InfoC />} />
          <Route path="/newpw" element={<Newpw />} />
          <Route path="/profilechange" element={<Profilechange />} />
          <Route path="/join" element={<Join />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

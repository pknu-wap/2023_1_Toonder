import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './component/join/join';
import React, { useEffect, useState } from 'react';
import Newpw from './component/find/newpw';
import Findpw from './component/find/findpw';
import Login from './component/login/login';
import Mainpage from './component/main/main_page';
import MainWebtoonList from './component/main/mainWebtoonList';
import MainBacksmall from './component/backgrounds/mainBackSmall';
import MainWebtoonInfo from './component/main/mainWebtoonInfo';
import Mypage from './component/main/mypage';
import Freeboard from './component/freeboard/freeboard';
import InfoC from './component/main/infoChange';
import Write from './component/freeboard/write';
import axios from 'axios';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main_page" element={<Mainpage />} />
          <Route path="/findpw" element={<Findpw />} />
          <Route path="/mainWebtoonList" element={<MainWebtoonList />} />
          <Route path="/mainbackground" element={<MainBacksmall />} />
          <Route path="/mainwebtooninfo" element={<MainWebtoonInfo />} />
          <Route path="/freeboard" element={<Freeboard />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/infochange" element={<InfoC />} />
          <Route path="/newpw" element={<Newpw />} />
          <Route path="/join" element={<Join />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

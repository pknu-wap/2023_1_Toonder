import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Findid from './component/findid';
import Findpw from './component/findpw';
import Login from './component/login';
import Mainpage from './component/main_page';
import React from 'react';
import Background from './component/backGround';
import Findid_after from './component/findid_after';
import Findpw_after from './component/findpw_after';
import Signin from './component/signIn';
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
          <Route path="/findpw_after" element={<Findpw_after />} />
          <Route path="/signIn" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

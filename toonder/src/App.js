import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Findid from './component/findid';
import Login from './component/login';

import Signin from './component/signIn';
import React from 'react';

import Findpw from './component/findpw';
import React from 'react';
import Findid_after from './component/findid_after';
import Findpw_after from './component/findpw_after';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/findid" element={<Findid />} />

          <Route path="/signin" element={<Signin />} />

          <Route path="/findpw" element={<Findpw />} />
          <Route path="/findid_after" element={<Findid_after />} />
          <Route path="/findpw_after" element={<Findpw_after />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

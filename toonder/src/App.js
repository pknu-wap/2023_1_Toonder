import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Findid from './component/findid';
import Login from './component/login';
import Findpw from './component/findpw';
import React from 'react';
import Findid_after from './component/findid_after';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/findid" element={<Findid />} />
          <Route path="/findpw" element={<Findpw />} />
          <Route path="/findid_after" element={<Findid_after />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Findid from './component/findid';
import Login from './component/login';
import Signin from './component/signIn';
import React from 'react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/findid" element={<Findid />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

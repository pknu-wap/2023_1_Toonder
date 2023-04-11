import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Findid from './component/findid';
import Login from './component/login';
import React from 'react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/findid" element={<Findid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

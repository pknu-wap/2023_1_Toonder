import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './component/signIn';
import React, { useEffect } from 'react';
import Findid from './component/findid';
import Findpw from './component/findpw';
import Login from './component/login';
import Mainpage from './component/main_page';
import Findid_after from './component/findid_after';
import Findpw_after from './component/findpw_after';
import Tag from './component/tag';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios
      .get('/api/hello')
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    axios
      .get('/api/username')
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main_page" element={<Mainpage />} />
          <Route path="/findid" element={<Findid />} />

          <Route path="/signin" element={<Signin />} />
          <Route path="/findpw" element={<Findpw />} />
          <Route path="/findid_after" element={<Findid_after />} />
          <Route path="/findpw_after" element={<Findpw_after />} />
          <Route path="/123" element={<Tag />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

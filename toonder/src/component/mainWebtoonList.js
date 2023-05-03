import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./mainPage.css";
import MainBackgorund from './mainBackground';
import ex1 from "../images/ex1.png"
import ex2 from "../images/ex2.png"
import ex3 from "../images/ex3.png"
import ex4 from "../images/ex4.png"
import ex5 from "../images/ex5.png"
import ex6 from "../images/ex6.png"
import ex7 from "../images/ex7.png"
import ex8 from "../images/ex8.png"

function MainWebtoonList() {
  const navigate = useNavigate();

  return (
    <MainBackgorund>
      <div className='mainWebtoonList'>
          <table>
            <tr>
                <td><img src={ex1} alt="image error" /></td>
                <td><img src={ex2} alt="image error" /></td>
                <td><img src={ex3} alt="image error" /></td>
                <td><img src={ex4} alt="image error" /></td>
            </tr>
            <tr>
                <td><img src={ex5} alt="image error" /></td>
                <td><img src={ex6} alt="image error" /></td>
                <td><img src={ex7} alt="image error" /></td>
                <td><img src={ex8} alt="image error" /></td>
            </tr>
          </table>
      </div>

    </MainBackgorund>
  );
}

export default MainWebtoonList;
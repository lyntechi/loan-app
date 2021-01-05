import React from "react";
import { FaCarSide } from "react-icons/fa";
import {AiFillHeart} from 'react-icons/ai'

function Nav() {
  return (
    <div className="container">
      <h1>
        AutoZap Loans <FaCarSide className="car-logo" />
      </h1>
      <h2>We <AiFillHeart className='heart-logo'/> our customers</h2>
    </div>
  );
}

export default Nav;

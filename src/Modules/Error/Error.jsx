import React from 'react';
import './Error.scss';
import Snowfall from 'react-snowfall';
import Lolipop from '../../Assets/lollipop.png';
const Error = () => {
  return (
    <div id="errorPage" className="containe">
      <Snowfall snowflakeCount={300} className="snow" />

      <h1 classname="l">404</h1>
      <h3>Seems like you're lost.</h3>
      <h5> or did your parents abandon you here?</h5>
      <h6>Oh... </h6>

      <p>
        here take a lolipop{' '}
        <a href="/">
          {' '}
          <img src={Lolipop} alt="" className="lolipop" />
        </a>
      </p>
    </div>
  );
};

export default Error;

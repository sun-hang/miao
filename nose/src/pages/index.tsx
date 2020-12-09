import React from 'react';
import './index.less';
const adSrc = require('../../public/ad.webp')
const Home = () => {
  return (
    <div className="home-wrapper">
      <img src={adSrc} alt=""/>
    </div>
  );
}
Home.title = "温柔小方的杂货铺";
export default Home;

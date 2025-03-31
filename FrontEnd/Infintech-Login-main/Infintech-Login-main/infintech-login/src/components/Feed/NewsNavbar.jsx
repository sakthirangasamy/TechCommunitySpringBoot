// components/NewsNavbar.js
import React from 'react';
import '../../components/Global.css';

const NewsNavbar = () => {
  return (
    <div className="navbar news-navbar">
      <h3>News & Announcements</h3>
      <ul>
        <li>New React Version Released</li>
        <li>Next Tech Meet-Up: 2024</li>
        <li>Community Updates</li>
      </ul>
    </div>
  );
};

export default NewsNavbar;

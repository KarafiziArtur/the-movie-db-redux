import React from 'react';
import './Footer.css';

const Footer = (props) => (
    <div className="Footer">
      <div className="Footer__links">
        <a href="https://github.com/KarafiziArtur/the-movie-db-redux" target="_blank">Github repository</a>
      </div>
      <div className="Footer__copy">
        {new Date().getFullYear()}  &copy;  Designed by <a href="https://codepen.io/KarafiziArtur/full/gPxMqX" target="_blank">Karafizi Arthur</a>
      </div>
    </div>
);

export default Footer;
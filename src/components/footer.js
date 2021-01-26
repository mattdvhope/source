import React from 'react';

import { Link } from "gatsby";

const Footer = ({ siteName }) => {

	let footerLink;

  if (/steps/.test(window.location.href)) {
  	footerLink = <Link to="/" style={{ color: `#fff`}}>{siteName}</Link>
  } else {
  	footerLink = <Link to="/steps" style={{ color: `#fff`}}>Look at some more Steps...</Link>
  }

  return (
    <div className="site-footer" id="footer">
      <div className="container">
        <span>{footerLink}</span>
      </div>
    </div>
  );

}

export default Footer;
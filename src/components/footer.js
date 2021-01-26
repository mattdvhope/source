import React, { useState, useEffect } from 'react';

import { Link } from "gatsby";

const Footer = ({ siteName }) => {

	const footerLink = <Link to="/steps" style={{ color: `#fff`}}>Look at some more Steps...</Link>
	const [footerLinkAndTitle, setFooterLinkAndTitle] = useState(footerLink);

	useEffect(() => {
	  if (/steps/.test(window.location.href)) {
			return setFooterLinkAndTitle(<Link to="/" style={{ color: `#fff`}}>{siteName}</Link>);
	  }
  }, []); // [] will prevent infinite loop!!! see https://medium.com/@andrewmyint/infinite-loop-inside-useeffect-react-hooks-6748de62871

  return (
    <div className="site-footer" id="footer">
      <div className="container">
        <span>{footerLinkAndTitle}</span>
      </div>
    </div>
  );

}

export default Footer;
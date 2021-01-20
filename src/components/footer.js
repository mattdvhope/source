import React, { Component } from "react";
import { Link } from "gatsby";

export default class footer extends Component {
  render() {
    return (
      <div className="site-footer" id="footer">
        <div className="container">
          <span><Link to="/" style={{ color: `#fff`}}>{this.props.siteName}</Link></span>
        </div>
      </div>
    );
  }
}

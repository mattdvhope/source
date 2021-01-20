import React, { Component } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
  }

  render() {
    const { data, header } = this.props;
    const { menu } = this.state;
    return (
      <header className={`site-header ${menu ? "active" : ""}`}>
        <div className="container">
          <div className="header-main">
            <div className="logo">
              <Link to="/">
                {data.logo.fluid ? (
                  <Img
                    fluid={data.logo.fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    className="site-header-logo"
                  />
                ) : (
                  <span>{data.siteName}</span>
                )}
              </Link>
            </div>
            <div
              className="responsive-menu"
              onClick={() => {
                this.setState({
                  menu: !menu
                });
              }}
            >
              <span></span>
            </div>
            {header === "home" ? (
              <div className="menu">
                <ul
                  onClick={() => {
                    this.setState({
                      menu: false
                    });
                  }}
                >
                  <li key="what">
                    <Link to="/what">What is this?</Link>
                  </li>
                  <li key="step">
                    <Link to="/steps">Take a Step</Link>
                  </li>
                  {data.menus
                    .filter(item => item === "About")
                    .map(t => {
                      return (
                        <li key="About">
                          <Link to={`/#About`}>About</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Service")
                    .map(t => {
                      return (
                        <li key="Service">
                          <Link to={`/#Service`}>Service</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Blogs")
                    .map(t => {
                      return (
                        <li key="Blogs">
                          <Link to={`/#Blogs`}>Blogs</Link>
                        </li>
                      );
                    })}

                  {data.menus
                    .filter(item => item === "Work")
                    .map(t => {
                      return (
                        <li key="Work">
                          <Link to={`/#Work`}>Work</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Testimonials")
                    .map(t => {
                      return (
                        <li key="Testimonials">
                          <Link to={`/#Testimonials`}>Testimonials</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Photos")
                    .map(t => {
                      return (
                        <li key="Photos">
                          <Link to={`/#Photos`}>Photos</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Contact")
                    .map(t => {
                      return (
                        <li key="Contact">
                          <Link to={`/#Contact`}>Contact</Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ) : (
              <div className="menu">
                <ul
                  onClick={() => {
                    this.setState({
                      menu: false
                    });
                  }}
                >
                  <li key="beginning">
                    <Link to="/#beginning">Beginning</Link>
                  </li>
                  <li key="what">
                    <Link to="/what">What is this?</Link>
                  </li>
                  <li key="step">
                    <Link to="/steps">Take a Step</Link>
                  </li>
                  {data.menus
                    .filter(item => item === "Steps")
                    .map(t => {
                      return (
                        <li key="steps">
                          <Link to="/steps">Steps</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Blogs")
                    .map(t => {
                      return (
                        <li key="blogs">
                          <Link to="/blogs">Blogs</Link>
                        </li>
                      );
                    })}
                  {data.menus
                    .filter(item => item === "Photos")
                    .map(t => {
                      return (
                        <li key="photos">
                          <Link to="/photos">Photos</Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
}

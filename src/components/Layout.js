/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import LeftSidebar from "../components/sidebar/LeftSidebar";
import { StaticQuery, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./header/Header";
import MobileBio from "./header/MobileBio";
import "./layout.css";
import TechTags from "./sidebar/TechTags";
// import { Sign } from "./Sign";

// Sign();
const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              tagline
              author
              copyright
              contacts {
                linkedin
                facebook
                resume
                blogger
                line
              }
            }
          }
          allContentfulBlogPost {
            edges {
              node {
                tags
              }
            }
          }
        }
      `}
      render={data => {
        const metadata = data.site.siteMetadata;
        return (
          <>
            <Header siteTitle={metadata.title} />
            <MobileBio author={metadata.author} tagline={metadata.tagline} contacts={metadata.contacts} />
            <div
              style={{
                margin: `0 auto`,
                padding: `0px 1.0875rem 1.45rem`,
                paddingTop: 0,
              }}
            >
              <main className="main-layout">
                <div className="index-main">
                  <div className="sidebar border-right px-4 py-2">
                    <LeftSidebar />
                  </div>
                  {children}
                </div>
              </main>
              <footer className="text-center">
                <div className="mobile-tech-tags mt-4">
                  <TechTags posts={data.allContentfulBlogPost.edges} />
                </div>
                <hr />
                <p className="d-inline my-emoji">{metadata.copyright}</p>
              </footer>
              <link href="https://fonts.googleapis.com/css?family=Quicksand|Oswald:400,700" rel="stylesheet"/>
            </div>
          </>
        );
      }}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

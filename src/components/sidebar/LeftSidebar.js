import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Bio from "./Bio";
import "./sidebar.css";

import Socials from "../Socials";
import TechTags from "./TechTags";

const LeftSidebar = () => {
  return (
    <StaticQuery
      query={graphql`
        query SiteBioQuery {
          site {
            siteMetadata {
              title
              tagline
              author
              contacts {
                linkedin
                facebook
                blogger
                resume
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
      render={data => (
        <>
          <div className="sidebar-main ">
            <Bio author={data.site.siteMetadata.author} tagline={data.site.siteMetadata.tagline} />
            <Socials mobile={false} contacts={data.site.siteMetadata.contacts} />
            <div className="tech-tags mt-4">
              <TechTags posts={data.allContentfulBlogPost.edges} />
            </div>
            <link href="https://fonts.googleapis.com/css?family=Quicksand|Oswald:400,700" rel="stylesheet"/>
          </div>
        </>
      )}
    />
  );
};

export default LeftSidebar;

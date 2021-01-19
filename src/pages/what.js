import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Link } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default class Blogs extends Component {
  render() {
    const data = this.props.data.contentfulAboutMe;
    return (
      <Layout>
        <SEO
          title="Blogs"
          keywords={[`Rohit Gupta`, `Frontend Developer`, `Developer`, `Blogs`]}
        />
        <div className="site-container blogs-page" id="Blogs">
          <div className="container">
            <div className="section-head">
              <h1 className="line-heading h2">What is this?</h1>
            </div>
            <div className="about-main row">
              <div className="left col-md-5 col-lg-4 mb-3">
                <Img
                  fluid={data.photo.fluid}
                  objectFit="cover"
                  objectPosition="top center"
                />
              </div>
              <div className="left col-md-7 col-lg-8">
                <div className="about-details">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.description.childMarkdownRemark.html
                    }}
                  />
                </div>
              </div>
            </div>
            <br/>
            <br/>
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query WhatQuery {
    contentfulAboutMe {
      name
      photo {
        file {
          url
        }
        fluid {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

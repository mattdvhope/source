import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default class What extends Component {
  render() {
    const data = this.props.data.contentfulAboutMe;
    return (
      <Layout>
        <SEO
          title="What is this?"
          keywords={[`Tertullian`, `Assembler of knowledge`, `Developer`, `Pages`]}
        />
        <div className="site-container blogs-page" id="What">
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

import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import moment from "moment";
import { DiscussionEmbed } from "disqus-react";
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";

export default class stepPost extends Component {
  render() {
    const data = this.props.data.contentfulSteps;
    const tagData = this.props.data.allContentfulSteps;
    const disqusShortname = "RohitGupta";
    const disqusConfig = {
      identifier: data.id,
      title: data.title
    };

    const siteurl = this.props.data.contentfulSiteInformation.siteUrl + "/";
    const twiteerhandle = this.props.data.contentfulSiteInformation
      .twiteerHandle;
    const socialConfigss = {
      site: {
        siteMetadata: { siteurl, twiteerhandle }
      },
      title: data.title,
      slug: data.slug
    };

console.log(data.createdAt)
    return (
      <Layout>
        <SEO
          title={data.title}
          keywords={[
            `Matt`,
            `Frontend Developer`,
            `Developer`,
            `${data.title}`
          ]}
        />
        <div className="site-container step-post">
          <div className="container">
            {data.featureImage ? (
              <Img
                className="feature-img"
                fluid={data.featureImage.fluid}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            ) : (
              <div className="no-image"></div>
            )}

            <div className="details">
              <h1 className="title">{data.title}</h1>
              <span className="date">
                <i className="fas fa-calendar-alt"></i>{" "}
                {moment(data.createdAt).format("LL")}
              </span>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description.childMarkdownRemark.html
                }}
              />
            </div>
            <div className="left col-md-7 col-lg-8">
              <h3>Tags for "{data.title}"...</h3>
              <ul>
                {data.tags.map(tag => (
                  <li key={tag}>
                    <Link to={`/tags/${kebabCase(tag)}/`}>
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
        {/* <Share
              socialConfig={{
                ...socialConfigss.site.siteMetadata.twiteerhandletitle,
                config: {
                  url: `${siteurl}${socialConfigss.slug}`,
                  title: `${socialConfigss.title}`
                }
              }}
            />
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />  */}    
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query SingleStepQuery($slug: String!) {
    contentfulSteps(slug: { eq: $slug }) {
      id
      title
      slug
      featureImage {
        fluid(maxWidth: 1500) {
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
      tags
      createdAt
    }

    allContentfulSteps {
      group(field: tags) {
        totalCount
      }
    }

    contentfulSiteInformation {
      siteUrl
      twiteerHandle
    }
  }
`;

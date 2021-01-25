import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import moment from "moment";
import { DiscussionEmbed } from "disqus-react";
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";

import StepContentHolder from "./StepContentHolder"

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
            <StepContentHolder data={data} />
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
      ctaFirst
      youtubeUrl
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

      promptsForResponse {
        promptContent {
          childMarkdownRemark {
            html
          }
        }
        buttonInvitation
        orderNumber
      }

      ctaLast {
        childMarkdownRemark {
          html
        }
      }


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

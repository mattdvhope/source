import React, { Component } from "react";
import { graphql } from "gatsby";
import moment from "moment";
import { DiscussionEmbed } from "disqus-react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";
import Pagination from "../components/Pagination";

import StepContentHolder from "./StepContentHolder"
import TagsInStepPost from "./TagsInStepPost"

export default class stepPost extends Component {

  render() {
    const data = this.props.data.contentfulSteps;

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
            <TagsInStepPost tags={data.tags}/>
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
  }
`;

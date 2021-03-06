import React from "react";
import Img from "gatsby-image";
import { Link, graphql } from "gatsby";
import { kebabCase } from "lodash";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Pagination from "../components/Pagination";
import { getPlurals, getTechTags, getPublishDate } from "../utils/GatsbyanUtils";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import "../components/pagination.css";

class AboutPage extends React.Component {
  render() {
    const contents = this.props.data.allContentfulBlogPost;
    const posts = contents.edges;
    const pageInfo = contents.pageInfo;
    const tag = this.props.pageContext.tag;
    const url = tag ? `/tags/${kebabCase(tag)}` : ``;

    const metadata = this.props.data.site.siteMetadata;
    return (
      <Layout>
        <SEO title="About page" url={metadata.siteUrl} />
        
        
      </Layout>
    );
  }
}

export const aboutQuery = graphql`
  query AboutQuery($skip: Int, $limit: Int = 10, $tag: String) {
    allContentfulBlogPost(
      skip: $skip
      limit: $limit
      sort: { fields: publishDate, order: DESC }
      filter: { tags: { eq: $tag } }
    ) {
      edges {
        node {
          slug
          body {
            childMarkdownRemark {
              timeToRead
              excerpt(pruneLength: 300)
            }
          }
          tags
          title
          publishDate
          heroImage {
            fixed(width: 160, toFormat: JPG) {
              width
              height
              src
              srcSet
              tracedSVG
            }
          }
          id
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        perPage
        currentPage
        pageCount
        itemCount
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export default AboutPage;

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

class IndexPage extends React.Component {
  render() {
    const contents = this.props.data.allContentfulBlogPost;
    const posts = contents.edges;
    const pageInfo = contents.pageInfo;
    const tag = this.props.pageContext.tag;
    const url = tag ? `/tags/${kebabCase(tag)}` : ``;

    const metadata = this.props.data.site.siteMetadata;
    return (
      <Layout>
        <SEO title="Source of All Wealth" url={metadata.siteUrl} />
        <div className="post-main">
          {posts.map(post => {
            const tags = post.node.tags;
            const timeToRead = post.node.body.childMarkdownRemark.timeToRead;
            return (
              <div id={post.node.id} key={post.node.id} className="container d-block pb-3 blog-content">
                <div className="post-container">
                  <h3 className="title">
                    <Link to={`/blog/${post.node.slug}`} className="text-link">
                      {post.node.title}
                    </Link>
                  </h3>
                  <div className="title text-info">
                    <span className="page-info">{getPublishDate(post.node.publishDate)}</span>
                    <span className="page-info">
                      {timeToRead} min{getPlurals(timeToRead)} read
                    </span>
                    <br />
                    <span className="page-info">{getTechTags(tags)}</span>
                  </div>
                  <div className="pt-1">
                    {post.node.heroImage && (
                      <Img
                        style={{ maxHeight: "160px" }}
                        className="index-thumbnail"
                        fixed={post.node.heroImage.fixed}
                      />
                    )}
                    <p style={{ textAlign: `left` }}>
                      {post.node.childContentfulBlogPostDescriptionTextNode.description}
                      <Link to={`/blog/${post.node.slug}`} className="text-primary">
                        <small className="d-inline ml-1"> Read more </small>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="text-center mt-4">
            <Pagination totalPageCount={pageInfo.pageCount} url={url} currentPage={pageInfo.currentPage} />
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query HomeQuery($skip: Int, $limit: Int = 10, $tag: String) {
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
          childContentfulBlogPostDescriptionTextNode {
            description
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

export default IndexPage;

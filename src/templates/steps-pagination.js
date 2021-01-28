import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Link } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Pagination from "../components/Pagination";

export default class Steps extends Component {
  render() {
    const { data } = this.props;
    const { currentPage } = this.props.data.allContentfulSteps.pageInfo;
    const { totalPageCount } = this.props.pathContext;

    return (
      <Layout>
        <SEO
          title="Step Out"
          keywords={[`Tertullian`, `Assembler of knowledge`, `Developer`, `Pages`]}
        />
        <div className="site-container steps-page" id="Steps">
          <div className="container">
            <div className="section-head">
              <h3 className="line-heading h3">Steps....</h3>
            </div>
            <ul
              className={`steps-list ${
                data.allContentfulSteps.edges.length < 5 ? "few-steps" : ""
              }`}
            >
              {data.allContentfulSteps.edges.map((item, index) => {
                return (
                  <li key={index} className="item">
                    <div className="inner">
                      <Link className="link" to={`/${item.node.slug}`} />
                      {item.node.featureImage ? (
                        <Img
                          fluid={item.node.featureImage.fluid}
                          objectFit="cover"
                          objectPosition="50% 50%"
                        />
                      ) : (
                        <div className="no-image"></div>
                      )}
                      <div className="details">
                        <h3 className="title">{item.node.title}</h3>
                        <span className="date">
                          <i className="fas fa-calendar-alt"></i>{" "}
                          {moment(item.node.createdAt).format("LL")}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="text-center mt-4">
              <Pagination totalPageCount={totalPageCount} url={"/steps"} currentPage={currentPage} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query StepsQuery($skip: Int, $limit: Int = 5, $tag: String) {
    allContentfulSteps(
      skip: $skip
      limit: $limit
      sort: { fields: createdAt, order: DESC }
      filter: { tags: { eq: $tag } }
    ) {
      edges {
        node {
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
          createdAt
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
  }
`;

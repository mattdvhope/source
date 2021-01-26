import React, { Component } from "react";
import { Link, graphql } from "gatsby"
import Layout from "../components/layout";

const Tags = ({ pageContext, data }) => {

  const { tag } = pageContext
  const { edges, totalCount } = data.allContentfulSteps
  const tagHeader = `${totalCount} step${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <div className="site-container blogs-page" id="What">
        <div className="container">
          <div className="section-head">
            <h1 className="line-heading h2">{tagHeader}</h1>
          </div>
          <div className="about-main row">
            <div className="left col-md-7 col-lg-8">
              <ul>
                {edges.map(({ node }) => {
                  const { slug } = node
                  const { title } = node
                  return (
                    <li key={slug}>
                      <Link to={`/${slug}`}>{title}</Link>
                    </li>
                  )
                })}
              </ul>
              <Link to="/tags">All tags</Link>
            </div>
          </div>
          <br/>
          <br/>
        </div>
      </div>
    </Layout>
  )
}

export default Tags;

export const pageQuery = graphql`
  query TagsQuery($tag: String) {
    allContentfulSteps(
      limit: 2000
      sort: { fields: [createdAt], order: DESC }
      filter: { tags: {in: [$tag] } }
    ) {
      totalCount
      edges  {
        node {
          title
          slug
        }
      }
    }
    
  }
`
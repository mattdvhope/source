import React, { Component } from "react";
import { Link, graphql } from "gatsby"
import Layout from "../components/layout";

const Tags = ({ pageContext, data }) => {

  const { tag } = pageContext
  const { edges, totalCount } = data.allContentfulSteps
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <div>
        <h1>{tagHeader}</h1>
        <ul>
          {edges.map(({ node }) => {
            const { slug } = node
            const { title } = node
            console.log(slug)
            return (
              <li key={slug}>
                <Link to={`/${slug}`}>{title}</Link>
              </li>
            )
          })}
        </ul>
        {/*
                This links to a page that does not yet exist.
                You'll come back to it!
              */}
        <Link to="/tags">All tags</Link>
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
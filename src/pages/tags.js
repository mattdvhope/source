import React from "react"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout";

// Components

const TagsPage = ({ data }) => (
  <Layout>
    <div>
      <h1>Tags</h1>
      <ul>
        {data.allContentfulSteps.group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
)

export default TagsPage

export const pageQuery = graphql`
  query tagsPageQuery {
    
    allContentfulSteps(limit: 200) {
      totalCount
      edges {
        node {
          title
          slug
        }
      }
      group(field: tags) {
        fieldValue
      }
    }
    
  }
`
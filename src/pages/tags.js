import React from "react"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout";

const TagsPage = ({ data }) => (
  <Layout>
    <div className="site-container blogs-page" id="What">
      <div className="container">
        <div className="section-head">
          <h1 className="line-heading h2">Tags</h1>
        </div>
        <div className="about-main row">
          <div className="left col-md-7 col-lg-8">
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
        </div>
        <br/>
        <br/>
      </div>
    </div>
  </Layout>
)

export default TagsPage

export const pageQuery = graphql`
  query tagsPageQuery {
    allContentfulSteps(
      limit: 200
      sort: { fields: [createdAt], order: ASC }
    ) {
      edges {
        node {
          title
          slug
        }
      }
      group(field: tags) {
        fieldValue
        totalCount
      }
    }
  }
`
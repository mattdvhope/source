const path = require("path");
const _ = require("lodash")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const stepPostTemplate = path.resolve("src/templates/step-post.js");
  const tagTemplate = path.resolve("src/templates/tags.js")

  const result = await graphql(`
    {
      allContentfulSteps(limit: 200) {
        edges {
          node {
            id
            slug
          }
        }
        group(field: tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allContentfulSteps.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: stepPostTemplate,
      context: {
        slug: node.slug
      }
    })
  })

  const tags = result.data.allContentfulSteps.group;

  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

};


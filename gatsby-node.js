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

// This creates EACH Step/post page -- NOT src/pages/steps.js !!!
  posts.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: stepPostTemplate,
      context: {
        slug: node.slug
      }
    })
  })

// This creates pages containing a certain number of posts per page
// It 're-creates' src/pages/steps.js with a different url !!!
  const postsPerPage = 5;
  const totalPageCount = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: totalPageCount }).forEach((value, i) => {
    createPage({
      path: i === 0 ? `/steps` : `/steps/${i + 1}`, // no `steps/1`
      component: path.resolve("./src/templates/steps-pagination.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        totalPageCount: totalPageCount
      },
    });
  });

// This creates each tag page
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


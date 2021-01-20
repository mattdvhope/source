var path = require("path");

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    const stepPostTemplate = path.resolve("src/templates/step-post.js");
    resolve(
      graphql(`
        {
          allContentfulSteps(limit: 100) {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.allContentfulSteps.edges.forEach(edge => {
          createPage({
            path: edge.node.slug,
            component: stepPostTemplate,
            context: {
              slug: edge.node.slug
            }
          });
        });
        return;
      })
    );
  });
};

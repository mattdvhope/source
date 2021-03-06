const path = require(`path`);
const _ = require("lodash");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  tags
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const postSizeByTag = new Map();
        const posts = result.data.allContentfulBlogPost.edges;
        posts.forEach(post => {
          if(post.node.tags){
            post.node.tags.forEach(tag =>{
              let count = postSizeByTag.has(tag) ? postSizeByTag.get(tag) + 1 : 1;
              postSizeByTag.set(tag, count);
            });
          }
          createPage({
            path: `/blog/${post.node.slug}`,
            component: path.resolve("./src/templates/blog-post.js"),
            context: {
              slug: post.node.slug,
            },
          });
        });

        const postsPerPage = 10;
        const numPages = Math.ceil(posts.length / postsPerPage);
        Array.from({ length: numPages }).forEach((value, i) => {
          createPage({
            path: i === 0 ? `/` : `/${i + 1}`,
            component: path.resolve("./src/pages/index.js"),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
            },
          });
        });

        postSizeByTag.forEach((size, tag) => {
          const numTags = Math.ceil(size / postsPerPage);
          Array.from({ length: numTags }).forEach((value, i) => {
            createPage({
              path: `/tags/${_.kebabCase(tag)}` + (i === 0 ? `` : `${i + 1}`),
              component: path.resolve("./src/pages/index.js"),
              context: {
                tag: tag,
                limit: postsPerPage,
                skip: i * postsPerPage,
              },
            });
          });
        });

        createPage({
          path: `/archive`,
          component: path.resolve("./src/templates/archive.js"),
        });
      })
    );
  });
};

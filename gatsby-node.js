// Code in this file is run once every time you run a develop or build command.
// This file is generally used to create pages dynamically, add nodes in GraphQL. 


/* The onCreateNode function will be called by Gatsby whenever a new node is created. 
   This will create a Graphql allcommerceProduct listing resource on GraphQl.
   Ideally this should be available by default but sadly it isn't 😞😞😞*/
exports.onCreateNode = ({
  createNodeId, node, getNode, actions,
}) => {
  if (node.internal.type.startsWith('product__')) {
    const crossBundleNode = JSON.parse(JSON.stringify(node));
    const products = getNode(crossBundleNode.relationships.variations___NODE[0]);
    crossBundleNode.id = createNodeId(`crossBundle-${crossBundleNode.id}`);
    crossBundleNode.internal.type = 'commerceProduct';
    crossBundleNode.parent = node.id;
    delete crossBundleNode.internal.owner;
    actions.createNode(crossBundleNode);
  }
};

/* 
  Create pages will help us create dynamic pages.

*/

const path = require('path');
exports.createPages = async ({ graphql, actions, getNodesByType }) => {
  const { createPage } = actions;
  const allProducts = await graphql(`
  {
    allCommerceProduct {
      nodes {
        drupal_id
        path {
          alias
        }
      }
    }
  }
`);

  /* In our template file we will get the context id for each product.
     We will use the context id to query data for each product in template file.
   */

  allProducts.data.allCommerceProduct.nodes.map(async (node) => {
    createPage({
      path: node.path.alias,
      component: path.join(__dirname, '/src/templates/ProductDetail.js'),
      context: {
        id: node.drupal_id,
      },
    });
  });
};
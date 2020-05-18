import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import ProductListing from '../components/Products/ProductListing'

const Products = (props) => {
  const {products} = useStaticQuery(allProducts);
  return(
    <Layout>
      <ProductListing {...products} />
    </Layout>
  );
}

export default Products;

const allProducts = graphql`
  query {
  products : allCommerceProduct {
    nodes {
      title
      path {
        alias
      }
      relationships {
        variations {
          ... on product_variation__clothing {
            title
            price {
              formatted
            }
            relationships {
              field_images {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 285, maxHeight: 300) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          ... on product_variation__simple {
            title
            price {
              formatted
            }
            relationships {
              field_images {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 285, maxHeight: 300) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

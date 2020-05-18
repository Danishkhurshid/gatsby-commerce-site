import Layout from '../components/Layout'
import React from 'react';
import { graphql } from 'gatsby';
import ProductItem from '../components/Products/ProductItem';

export default (props) => {
  const data = props?.data?.allCommerceProduct;
  return(
    <Layout>
      <ProductItem {...data}/>
    </Layout>
  );
}

export const productQuery = graphql`
  query($id: String!) {
    allCommerceProduct (filter: {drupal_id: {eq: $id}}) {
      nodes {
        drupal_id
        title
        relationships {
        variations {
          ... on product_variation__clothing {
            drupal_id
            title
            internal {
              type
            }
            relationships {
              attribute_color {
                drupal_id
                name
                field_color {
                  color
                }
              }
              attribute_size {
                drupal_id
                name
              }
              field_images {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 420, maxHeight: 300) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          ... on product_variation__simple {
            drupal_id
            title
            internal {
              type
            }
            relationships {
              field_images {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 420, maxHeight: 300) {
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
  }
`;

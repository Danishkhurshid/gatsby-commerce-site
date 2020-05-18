import React from 'react';
import Img from 'gatsby-image';
import styled from "styled-components"; // 💅 yay!
import { Link } from 'gatsby';


const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const ProductStyle = styled(Link)`
  width: calc(25% - 1rem);
  padding: .5rem;
  text-decoration: none;
  &:hover {
    background-color: #41449f;
    z-index: 2;
    cursor: pointer;
  }
`
const Title = styled(Link)`
text-decoration: none;
transition: all .4s ease;
`
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  font-size: 18px;
  border-top: 2px solid white;
`
const Price = styled.div`

`
const ProductListing = (props) => {
  const data = props.nodes.map( node => {
    return(
      <ProductStyle to={node.path.alias}>
        <Img fluid={node.relationships.variations[0].relationships.field_images[0].localFile.childImageSharp.fluid}></Img>
        <TitleContainer>
          <Title>{node.title}</Title>
          <Price>{node.relationships.variations[0].price.formatted}</Price>
        </TitleContainer>
      </ProductStyle>
    );
  })
return(<ProductContainer>{data}</ProductContainer>)
}

export default ProductListing;

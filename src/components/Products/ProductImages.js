import React, { useState, useEffect } from 'react';
import Img from 'gatsby-image';
import styled from "styled-components"; // 💅 yay!

const ImageThumbnail = styled.div`
    max-width: 50%;
    width: 100%;
    margin: 4px;
`
const ImageThumbnailWrapper = styled.div`
  width: 100%;
  max-width: 30%;
`
const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 0.75rem;
  width: 60%;
`
const DisplayImage = styled.div`
  width: 100%;
  max-width: 65%;
`


const ProductImages = (props) => {
  const [imageIndex, updateImageIndex] = useState(0);

  const {variation} = props || '';
  return(
    <>
    {(() => {
      if (variation) {
          let images = variation.relationships.field_images;
          return (
            <ImageWrapper>
              <ImageThumbnailWrapper>
                {
                  images.map((image, id) => (
                    <ImageThumbnail key={id} onClick={() => { updateImageIndex(id); }}>
                      {image.localFile && <Img fluid={image.localFile.childImageSharp.fluid} />}
                    </ImageThumbnail>
                  ))
                }
              </ImageThumbnailWrapper>
              <DisplayImage>
                <Img fluid={images[imageIndex].localFile.childImageSharp.fluid} />
              </DisplayImage>
            </ImageWrapper>
          );
      }
    })()}
  </>
  )
}

export default ProductImages;
import React, { useState, useEffect } from 'react';
import styled from "styled-components"; // 💅 yay!
import ProductImages from './ProductImages';
import ProductColor from './attributes/ProductColor';
import ProductSize from './attributes/ProductSize';
import CartButton from './attributes/CartButton';


const Wrapper = styled.div`
  display: flex;
`
const VariationWrap = styled.div`
 display: flex;
 flex-direction: column;
`

const ProductItem = (props) => {
  console.log(props);
  const {title, relationships} = props.nodes[0] || '';
  const {variations} = relationships || '';
  const attributes = {};
  const defaultVariationId = variations[0].drupal_id || '';
  const {type} = variations[0]?.internal;
  const [variationId, setVariationId] = useState(defaultVariationId || '');
  

  // Removing Duplicate Size and Color properties from varaiations.
  variations.forEach((variation) => {

    Object.keys(variation.relationships).map((key) => {
      const item = variation.relationships[key];
      if (key.startsWith('attribute_') && item != null) {
        if (!attributes.hasOwnProperty(key)) {
          attributes[key] = [];
        }
        attributes[key].push(item);
        attributes[key] = removeDuplicates(attributes[key], 'drupal_id');
      }
    });
  })


  const {attribute_color} = attributes || '';
  const [color, setColor] = useState(attribute_color && attribute_color[0].name);
  const [selectedAttribute, setSelectedAttribute] = useState(attribute_color && attribute_color[0].drupal_id);
  const [variationsIndex, updateVariationIndex] = useState(0);
  

  // Set variation id on size change
  const [size_options, setSizeOptions] = useState([]);
  const changeSize = (value) => {
    setVariationId(value);
  };

  // Invoke changeColor on Color change.
  const changeColor = (e, item) => {
    setSelectedAttribute(e.target.value);
    setColor(item);
  };

  // Change the variation everytime color changes.
  useEffect(() => {
    getresolvedVariation();
  }, [color]);

  const getresolvedVariation = () => {
    const updateSize = [];
    const updateColor = [];
    let size;
    variations.map((variation, i) => {

      if (selectedAttribute) {
        if (variation.relationships.attribute_color.drupal_id === selectedAttribute) {
          updateColor.push(i);
          size = variation.relationships.attribute_size && variation.relationships.attribute_size.name;
          if (size) {
            updateSize.push({
              id: variation.drupal_id,
              option: size,
            });
          } else {
            updateSize.push({
              id: variation.drupal_id,
            });
          }
        }
      }
    });

    setVariationId(updateSize[0] ? updateSize[0].id : defaultVariationId);
    setSizeOptions(updateSize[1] && updateSize);
    updateVariationIndex(updateColor[0] ? updateColor[0] : 0);
  };

  return(
  <Wrapper>
     {variations && <ProductImages variation={variations[variationsIndex]} />}
     <VariationWrap>
    <div>
     <ProductColor colors={attribute_color} color={color} changeColor={changeColor}/>
     <ProductSize sizes={size_options} changeSize={changeSize} variationId={variationId} color={color}/>
     </div>
     <CartButton variationId={variationId} type={type}/>
     </VariationWrap>
  </Wrapper>
  );
}

export default ProductItem;


const removeDuplicates = (myArr, prop) => myArr.filter((obj, pos, arr) => arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos);

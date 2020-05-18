import React from 'react';
import styled from "styled-components"; // 💅 yay!

const ColorWrapper = styled.div`
  ul {
    padding: 0;
  }
`
const ProductName = styled.div`
  margin-top: 20px;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`
const ColorOptions = styled.li`
  display: inline-block;
  position: relative;
`
const Input = styled.input`
  position: absolute;
  padding: 0;
  background: black;
  border: 0;
  height: 1px;
  width: 1px;
  clip: rect(1px 1px 1px 1px);
`
const InputLabel = styled.label`
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  border: solid white 1px;
  border-radius: 9999px;
  margin-right: 10px;
  cursor: pointer;
`

const ProductColor = ({colors, color, changeColor}) => {
  return colors && colors.length >= 1 ? (
    <ColorWrapper>
      <ProductName>
        Color :
        {` ${color}`}
      </ProductName>
      <ul>
        {colors.map((item, i) => {
          if (item.field_color.color) {
            const divStyle = {
              backgroundColor: item.field_color.color,
            };
            return (
              <ColorOptions key={i}>
                <Input
                  id={item.drupal_id}
                  type="radio"
                  style={divStyle}
                  value={item.drupal_id}
                  defaultChecked={i === 0}
                  name="attribute_color"
                  onChange={(e) => { changeColor(e, item.name); }}
                />
                <InputLabel style={divStyle} htmlFor={item.drupal_id} />
              </ColorOptions>
            )
          }
        })}
      </ul>
    </ColorWrapper>
  ) : '';
};

export default ProductColor;

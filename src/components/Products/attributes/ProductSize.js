import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const DetailSize = styled.div`
  margin-bottom: 1.75rem;
  .product-detail-size-options span {
    margin-right: 0.75rem;
    margin-bottom: 0.75rem;
    display: inline-block;
  }

  .product-detail-size-select {
    display: none;
  }

  .product-detail-size-options input {
    display: none;
  }
  .product-detail-size-options label {
    dispay: inline-block;
    font-size: 1.125rem;
    padding: 0.25rem  0.5rem;
    box-shadow: 0 0 0 1px #1b1b1b;
  }
  .product-detail-size-options input[type="radio"]:checked + label {
    color: #fff;
    background-color: #000;
    
  }
`

const Text = styled.p`
  font-size: .875rem;
  line-height: 1.25;
  margin-bottom: .5rem;
`

const ProductSize = ({sizes, changeSize, variationId, color}) => {
  const [checkedState, setCheckedState] = useState(0);

  useEffect(() => {
    setCheckedState(0);
  }, [color]);

  return sizes && sizes.length >= 1 ? (
    <DetailSize>
      <div>
        <Text>Size</Text>
        <div className="product-detail-size-options">
          {sizes.map((size, i) => {
            return (
              <span key={i}>
                <input
                  id={size.id}
                  data={i}
                  type="radio"
                  value={size.option}
                  checked={i === checkedState}
                  name="attribute_size"
                  onChange={(e) => { setCheckedState(i); changeSize(size.id); }}
                />
                <label htmlFor={size.id} >{size.option}</label>
              </span>
          )})}
        </div>
      </div>
      <select className="product-detail-size-select" name="attribute_size-mobile" onChange={(e) => { changeSize(e.target.value); }}>
        {
          sizes.map((option, i) => <option key={i} value={option.id}>{option.option}</option>)
        }
      </select>
    </DetailSize>
  ) : '';
};

export default ProductSize;

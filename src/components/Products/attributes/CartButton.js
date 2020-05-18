import React from 'react'
import styled from "styled-components"; // 💅 yay!
import CartHandler from '../../CartService';

const Button = styled.button`
  background-color: #1b1b1b;
  display: inline-block;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  font-size: .875rem;
  padding: .75rem .625rem;
  line-height: 1.5;
  max-height: 50px;
  margin-top: 20px;
`


const CartButton = (props) => {
  const {variationId, type} = props || '';
  const addToCart = async() => {
    const response = await CartHandler.addCartItem(variationId, type);
  }
  return(<>
    <Button onClick={addToCart}>Add To Cart</Button>
  </>)
}

export default CartButton;
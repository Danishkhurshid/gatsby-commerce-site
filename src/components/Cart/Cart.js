import React, {useEffect, useState} from 'react';
import CartHandler from '../CartService';
import styled from "styled-components"; // 💅 yay!

const CartWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  > div {
      width: 200px;
      margin-top : 20px;
   }
`

const Total = styled.div`
  margin-left: auto;
  margin-right: 200px;
  margin-top: 20px;
  border-top: double;
  padding-top: 10px;
`;

const Cart = () => {
  const [cartData, setCartData] = useState('');
  let totalPrice = 0;
  const getData = async () => {
    const getItems = await CartHandler.getCartItem();
    const data = getItems.included.filter(cartItem => cartItem.type.startsWith('order'));
    setCartData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const displayData = () => {
    const data =  cartData.map((item, key) => {
      const {quantity, title, unit_price, total_price, id} = item?.attributes;
      totalPrice += +total_price.number;
      return (
        <ItemWrapper key={key}>
          <div>{title}</div>
          <div>{quantity}</div>
          <div>{unit_price.formatted}</div>
          <div>{total_price.formatted}</div>
        </ItemWrapper>
      )
    });
    return data;
  }

  return (
    <CartWrapper>
      <ItemWrapper>
        <div>Title</div>
        <div>Quantity</div>
        <div>Unit Price</div>
        <div>Total Price</div>
      </ItemWrapper>
      { 
      cartData.length > 0 &&
        displayData()
      }
      <Total>Total: $ {totalPrice}</Total>
    </CartWrapper>
  )
}

export default Cart;
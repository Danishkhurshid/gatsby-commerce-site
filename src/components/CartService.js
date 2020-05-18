
const url = process.env.GATSBY_DRUPAL_ROOT;

class CartService {
  async getCartToken () {
    const tokgen = localStorage.getItem('cartToken') || Math.random().toString(12).substr(2);
    localStorage.setItem('cartToken', tokgen);
    var myHeaders = new Headers()
    let cartToken = tokgen;
    myHeaders.append('Commerce-Cart-Token',  cartToken)
    myHeaders.append('Content-Type', 'application/vnd.api+json');
    myHeaders.append('Accept', 'application/vnd.api+json')
    return myHeaders;
  }
  addCartItem = async (variationid, quantity) => {
    const header = await this.getCartToken();
    const res = await fetch(`${url}jsonapi/cart/add`, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        data : [
          {
            type: 'product-variation--clothing',
            id: variationid,
            meta: {
              quantity: 1
            }
          }
        ]
      })
    })
    if(res.status !== 200) {
      return false;
    } else {
      const data = await res.json();
      return data; 
    } 
  }

  getCartItem = async() => {
    const header = await this.getCartToken();
    const res = await fetch(`${url}jsonapi/carts`, {
      method: 'GET',
      headers: header,
    })
    if(res.status !== 200) {
      return false;
    } else {
      const data = await res.json();
      return data; 
    }
  }
}
const CartHandler = new CartService();
export default CartHandler;

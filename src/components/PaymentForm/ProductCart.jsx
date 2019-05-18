import React, { Component } from 'react';

class ProductCart extends Component {
    state = {  }

  
        

    render() { 
        const {product, media, removeid} = this.props
        return ( 
            <div key={product.id}><p>{product.productName}</p>
            <p>Price:  ₹ {product.price} </p>
            <p><img className="imgpay" src={media + product.image}  alt=""/></p>
            <button onClick={removeid}>Delete from Cart</button>
            </div>
         );
    }
}
 
export default ProductCart;
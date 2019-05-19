import React, {Component}  from 'react';
import "./ProductBox.css";
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import 'react-toastify/dist/ReactToastify.css';


class ProductBox extends Component {
    
    state = {  }
    notifyIdExists = () => { toast("The product already exist in the cart", { 
          bodyClassName: css({
            color: "red"
            
          }),
          progressClassName: css({
            background: "repeating-radial-gradient(circle at center, red 0, blue, green 30px)"
          })
    });}
    notifyProductAdded = () => { toast("The product added to cart");};
    
    handleClick(id) {
        const productCart = JSON.parse(localStorage.getItem('productCart'));
        const thiso = this;
        if (Array.isArray(productCart) && productCart.length) {
            productCart.map(function(element) {return element.id;}).indexOf(id) === -1 ?  (function () {productCart.push({
                'id': id,
                'quantity':1,
                }); thiso.notifyProductAdded()}()) : this.notifyIdExists();
            localStorage.setItem('productCart', JSON.stringify(productCart));
        } else {
            const ids = [ 
                {
                'id': id,
                'quantity':1,
                }
            ];
            
            localStorage.setItem('productCart', JSON.stringify(ids));
            this.notifyProductAdded();
        }

    

        
    }
    render() { 
        const {id, name, price, image } = this.props;
        return ( <div className="col-md-4 col-sm-6">
        <figure>
    <div><img className="productimg product" src={image} alt={name}/></div>
    
    <figcaption>
           <h4 className="textcenter">{name}</h4>
           
    </figcaption>
    <div className="product">
       <button onClick={this.handleClick.bind(this, id)} className="btn btn-sm btn-primary float-right">Add to Cart</button>
       <ToastContainer autoClose={2000}/>	
       <div>
           <span>₹{price}</span>
       </div> 
    </div> 
    </figure>
        
        </div> );
    }
}
 
export default ProductBox;


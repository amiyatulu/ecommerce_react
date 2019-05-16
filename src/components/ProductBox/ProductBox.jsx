import React  from 'react';
import "./ProductBox.css";
import { Link } from "react-router-dom";




const ProductBox = ({id, name, price, image }) => {
    return (
    
    <div className="col-md-4 col-sm-6">
    <figure>
<div><img className="productimg product" src={image} alt={name}/></div>

<figcaption>
       <h4 className="textcenter">{name}</h4>
       
</figcaption>
<div className="product">
   <Link to={`/payment/${id}`} className="btn btn-sm btn-primary float-right">Order Now</Link>	
   <div>
       <span>₹{price}</span>
   </div> 
</div> 
</figure>
    
    </div> );
}
 
export default ProductBox;
import React, { Component } from 'react';
import styles from './ProductList.module.css';
import './Product.css';
import './responsive.css';
import _ from "lodash";

class ProductList extends Component {
    state = {  }
    render() { 
        const {products} = this.props;
		console.log(products, "Hello");
		// const productslist = products.map(product => {})

	 const data =   _.chunk(products, 4)
	 console.log(data);
	 const row = (datum) => {
		return ( 
			<div className="row">
			{datum.map(dat => {
			 
			 return <div key={dat.ProductList} className="col-md-3 col-sm-6">
			 <figure className="card card-product">
		<div className={"img-wrap " + styles.imagecolor}><img src={dat.image_url} alt={dat.name}/></div>
		<figcaption className="info-wrap">
				<h4 className="title">{dat.name}</h4>
				<p className="desc"></p>
				
		</figcaption>
		<div className="bottom-wrap">
			<a href="/" className="btn btn-sm btn-primary float-right">Order Now</a>	
			<div className="price-wrap h5">
				<span className="price-new">₹{dat.price}</span>
			</div> 
		</div> 
	</figure>
			 
			 </div>;
			
			})}
			</div>
			)
	 }
	
        return (<React.Fragment>
			<div className="container">
			<br/>
			<br/>
			{_.map(data, row)}
			</div>
        </React.Fragment>);
    }
}
 
export default ProductList;
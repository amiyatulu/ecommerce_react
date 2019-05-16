import React, { Component } from 'react';
import ProductListView from '../../services/productService'

class ProductTest extends Component {
    state = {  }
    render() { 
        return ( <ProductListView category={this.props.category}/> );
    }
}
 
export default ProductTest;
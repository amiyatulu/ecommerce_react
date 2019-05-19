import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import _ from "lodash";
import './productService.css';
import ProductBox from '../components/ProductBox/ProductBox';
import { media } from '../config.json'


const GET_PRODUCT_LIST = gql`

query getProductList($category: String!){
  allProduct(jewelleryCategory_CategoryName: $category)
  {
    edges {
      node {
        id
        productName
        sku
        description
        jewelleryType {
          typeName
        }
        jewelleryCategory {
          categoryName
        }
        price
        stock
        image
      }
    }
  }
  }

`;

const ProductListView = ({category}) => (

    <Query query={GET_PRODUCT_LIST} variables={{category}}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error! ${error}`;
      // console.log(data);
     
      const products_chunk =   _.chunk(data.allProduct.edges, 3)
      const row = (datum, index) => {
        return (
          <div className="row"  key={index}>
             {datum.map(edge => {
               return <ProductBox 
               key={edge.node.id} 
               id = {edge.node.id}
               name={edge.node.productName} 
               image={`${media}${edge.node.image}` }
               price={edge.node.price}
               stock={edge.node.stock}
               />
             })}

          </div>
        )
      }
      return (
          <React.Fragment>
          {_.map(products_chunk, row)}
        </React.Fragment>
      );
    }}
    </Query>

);
   
export default ProductListView;
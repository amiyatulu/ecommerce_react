import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import _ from "lodash";
import { media } from '../../config.json';

const GET_PRODUCT_LIST = gql`

query getProductList($ids: [ID!]!){
    productList(ids: $ids){
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

`;

const ProductCart = ({ ids }) => (
    <Query query={GET_PRODUCT_LIST} variables= {{ ids }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error! ${error}`;

      return (
       <React.Fragment>
           {data.productList.map(product => <p key={product.id}>{product.productName}</p>)}
       </React.Fragment>
      );
    }}
    
    </Query>

);

export default ProductCart;
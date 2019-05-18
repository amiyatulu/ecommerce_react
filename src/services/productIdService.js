import client from './appoloclient';
import gql from 'graphql-tag'



export function getProduct(id) {
    console.log(id)
    return client.query({
        query: gql`
        query ($id: ID!) {
            product(id : $id ) {
              productName
              price
              image
            }
          }
        `,
        variables : {
            id : id
        }
      })
}

export function getProducts(ids) {
  return client.query({
  
    query:gql `
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
  
    `,
    variables : {
      ids : ids
    }

  })
}


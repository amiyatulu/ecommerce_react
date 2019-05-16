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


import client from './appoloclient';
import gql from 'graphql-tag'


export function getCategories() {
    return client.query({
        query: gql`
        query {
          allJewelleryCategories {
            edges {
              node {
                  id,
                categoryName,
                categoryUrl
              }
            }
          }
        }
        `
      })
}


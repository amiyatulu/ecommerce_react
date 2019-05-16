import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { graphql } from '../config.json'

const httpLink = createHttpLink({
  uri: graphql
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default client
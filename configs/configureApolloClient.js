import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-unfetch'

import API_ENDPOINT from './api'


const client = new ApolloClient( {
  uri: API_ENDPOINT,
  fetch
} )

export default client

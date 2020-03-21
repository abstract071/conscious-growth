import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import client from '../configs/configureApolloClient'

import '../styles/base.scss'


const App = ( { Component, pageProps } ) => {
  return (
    <ApolloProvider client={ client }>
      <Component { ...pageProps } />
    </ApolloProvider>
  )
}

export default App

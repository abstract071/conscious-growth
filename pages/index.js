import { ApolloProvider } from '@apollo/react-hooks'

import Todos from './todos'

import client from '../configs/configureApolloClient'

import { injectGlobal } from './styled/global.style'


const Index = () => (
  <ApolloProvider client={ client }>
    <Todos />
  </ApolloProvider>
)

export default Index

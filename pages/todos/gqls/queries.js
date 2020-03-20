import { gql } from 'apollo-boost'


export const GET_TODOS = gql`
  {
    todos {
      id
      title
      completed
    }
  }
`

import { gql } from 'apollo-boost'


export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    add(title: $title) {
      id
      title
      completed
    }
  }
`

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    destroy(id: $id) {
      id
      title
      completed
    }
  }
`

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: String!) {
    toggle(id: $id) {
      id
      title
      completed
    }
  }
`

export const TOGGLE_ALL_TODOS = gql`
  mutation ToggleAllTodos($checked: Boolean!) {
    toggleAll(checked: $checked) {
      id
      title
      completed
    }
  }
`

export const CLEAR_COMPLETED_TODOS = gql`
  mutation ClearCompletedTodos {
    clearCompleted {
      id
      title
      completed
    }
  }
`

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $title: String!) {
    save(id: $id, title: $title) {
      id
      title
      completed
    }
  }
`

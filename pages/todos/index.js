import React, {
  useState,
  useRef
} from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from '@apollo/react-hooks'
import differenceBy from 'lodash/differenceBy'

import Header from '../common/components/Header'

import Todo from './components/Todo'

import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  TOGGLE_TODO,
  CLEAR_COMPLETED_TODOS,
  TOGGLE_ALL_TODOS
} from './gqls'


const Todos = () => {
  const [todoText, setTodoText] = useState( '' )
  const [todosCompletedStatus, setTodosCompletedStatus] = useState( false )
  const textInput = useRef( null )
  const {
    loading,
    error,
    data = { todos: [] }
  } = useQuery( GET_TODOS )
  const [addTodo] = useMutation( ADD_TODO, {
    update: ( cache, { data: { add } } ) => {
      const { todos } = cache.readQuery( { query: GET_TODOS } )
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: [...todos, add] }
      } )
    }
  } )
  const [deleteTodo] = useMutation( DELETE_TODO, {
    update: ( cache, { data: { destroy } } ) => {
      const { todos } = cache.readQuery( { query: GET_TODOS } )
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: todos.filter( todo => todo.id !== destroy.id ) }
      } )
    }
  } )
  const [updateTodo] = useMutation( UPDATE_TODO )
  const [toggleTodo] = useMutation( TOGGLE_TODO )
  const [clearCompletedTodos] = useMutation( CLEAR_COMPLETED_TODOS, {
    update: ( cache, { data: { clearCompleted } } ) => {
      const { todos } = cache.readQuery( { query: GET_TODOS } )
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: differenceBy( todos, clearCompleted, 'id' ) }
      } )
    }
  } )
  const [toggleAllTodos] = useMutation( TOGGLE_ALL_TODOS, {
    update: ( cache, { data: { toggleAll } } ) => {
      const { todos } = cache.readQuery({ query: GET_TODOS } )
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: toggleAll }
      } )
    },
    onCompleted: () => setTodosCompletedStatus( !todosCompletedStatus )
  } )

  // TODO: uncomment when graphql server handles CORS
  // console.log( data )
  // if ( loading ) {
  //   return <p>Loading...</p>
  // }
  //
  // if ( error ) {
  //   return <p>Error :(</p>
  // }

  const handleTodoAdd = () => {
    if ( todoText === '' ) {
      return
    }
    console.log( todoText )
    addTodo( { variables: { title: todoText } } )
    setTodoText( '' )
    textInput.current.focus()
  }

  const handleTodoDelete = ( id ) => {
    console.log( id )
    deleteTodo( { variables: { id } } )
  }

  const handleTodoUpdate = ( data ) => {
    console.log( data )
    updateTodo( { variables: data } )
  }

  const handleTodoToggle = ( id ) => {
    console.log( id )
    toggleTodo( { variables: { id } } )
  }

  const handleCompletedTodosClear = () => {
    clearCompletedTodos()
  }

  const handleAllTodosToggle = () => {
    toggleAllTodos( { variables: { checked: !todosCompletedStatus } } )
  }

  const handleTodoInputChange = ( event ) => {
    setTodoText( event.target.value )
  }

  const handleKeyPress = ( event ) => {
    if( event.key === 'Enter' ){
      addTodo( { variables: { title: todoText } } )
      setTodoText( '' )
    }
  }

  return (
    <div className="container">
      <Header>Todo App</Header>
      {
        /*data.todos*/[{ id: 'dsgadf', title: 'Todo 1', completed: false }, { id: 'mrgbrtt', title: 'Todo 2', completed: true }].map( ( todo ) => (
          <Todo
            key={ todo.id }
            item={ todo }
            onDelete={ handleTodoDelete }
            onUpdate={ handleTodoUpdate }
            onToggle={ handleTodoToggle }
          />
        ) )
      }
      <div className="notes-btns">
        <div
          className="button"
          onClick={ handleTodoAdd }
        >Add</div>
        <div
          className="button"
          onClick={ handleAllTodosToggle }
        >Toggle All</div>
        <div
          className="button"
          onClick={ handleCompletedTodosClear }
        >Clear Completed</div>
      </div>
      <input
        className="input"
        placeholder="Enter Todos"
        type="text"
        ref={ textInput }
        value={ todoText }
        onChange={ handleTodoInputChange }
        onKeyPress={ handleKeyPress }
      />
    </div>
  )
}

export default Todos

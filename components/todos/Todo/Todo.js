import React, {
  useState,
  useRef
} from 'react'

import classes from './Todo.module.scss'


const Todo = ( {
  item = {},
  onUpdate,
  onDelete,
  onToggle
} ) => {
  const [todo, setTodo] = useState( item.title )
  const [isEditMode, setIsEditMode] = useState( false )
  const textInput = useRef( null )

  const handleTodoInputChange = ( event ) => {
    setTodo( event.target.value )
  }

  const handleEditClick = () => {
    setIsEditMode( !isEditMode )
  }

  const handleSaveClick = () => {
    onUpdate( { id: item.id, title: todo } )
    setIsEditMode( !isEditMode )
  }

  const handleCancelClick = () => {
    setTodo( item.title )
    setIsEditMode( !isEditMode )
  }

  return (
    <div className={ classes['note'] + `${ isEditMode ? ` ${classes['selected']}` : '' }` }>
      <div className={ classes['controls'] }>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={ item.completed }
          onChange={ () => onToggle( item.id ) }
        />
        {
          isEditMode ? (
            <input
              type="text"
              ref={ textInput }
              value={ todo }
              onChange={ handleTodoInputChange }
            />
          ) : item.title
        }
      </div>
      <div>
        {
          isEditMode ? (
            <>
              <button
                type="button"
                onClick={ handleSaveClick }
              >Save</button>
              <button
                type="button"
                onClick={ handleCancelClick }
              >Cancel</button>
            </>
          )
          : (
            <button
              type="button"
              onClick={ handleEditClick }
            >Edit</button>
          )
        }
        <button
          type="button"
          onClick={ () => onDelete( item.id ) }
        >Delete</button>
      </div>
    </div>
  )
}

export default Todo

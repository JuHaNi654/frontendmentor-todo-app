import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import "../scss/components/main.scss";
import FilterButton from './FilterButton';
import Header from './Header';


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

function Main({ theme, toggleTheme }) {
  const [todo, setTodo] = useState("")
  const [filter, setFilter] = useState("all")
  const [todoList, setTodoList] = useState([
    { text: "Jog around the park 3x", done: false }
  ])
  const addTodo = (e) => {
    e.preventDefault();
    const updatedList = todoList
    const newTodo = { text: todo, done: false }
    updatedList.unshift(newTodo)
    setTodoList([...updatedList])
    setTodo("")
  }

  const clearCompleted = () => {
    const updatedTodoList = todoList.filter(todo => todo.done !== true)
    setTodoList(updatedTodoList)
  }

  const deleteTodo = (index) => {
    const updatedTodoList = todoList.filter((_, i) => i !== index)
    setTodoList(updatedTodoList)
  }

  const setTodoState = (e, id) => {
    if (e.type === "click" || (e.key === "Enter" && e.type === "keydown")) {
      const updatedList = todoList.map((todo, index) => {
        if (index === id) {
          return { ...todo, done: !todo.done }
        } else {
          return todo
        }
      })
      setTodoList(updatedList)
    }
  }

  /* Drag and drop */
  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const updatedList = reorder(
      todoList,
      result.source.index,
      result.destination.index
    )

    setTodoList(updatedList)
  }

  /* Filter */
  const filterTodoList = (value) => {
    const filterBy = value || filter
    if (filterBy === "active") {
      return todoList.filter(todo => todo.done !== true)
    } else if (filterBy === "completed") {
      return todoList.filter(todo => todo.done !== false)
    } else if (filterBy === "all") {
      return todoList
    }
  }

  return (
    <main className="main container">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <div className="input-field">
        <button onClick={addTodo} arial-label="Add todo to list" className="input-field__submit circle pointer"></button>
        <form onSubmit={addTodo}>
          <input type="text" value={todo} id="itemField" onChange={e => setTodo(e.target.value)}
            className="input-field__input" placeholder="Create a new todo..."></input>
        </form>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
              {
                filterTodoList().map((todo, index) => (
                  <Draggable key={index} draggableId={`id-${index}`} index={index}>
                    {(providedChild, _) => (
                      <div ref={providedChild.innerRef}
                        {...providedChild.dragHandleProps}
                        {...providedChild.draggableProps}
                        className="todo-list__item">
                        <div className="flex align-center">
                          {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
                          <span role="checkbox" aria-checked={`${todo.done}`} tabIndex="0"
                            aria-labelledby={`todo-${index}`}
                            className="todo-list__item-check circle pointer text-center"
                            onKeyDown={e => setTodoState(e, index)}
                            onClick={e => setTodoState(e, index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" /></svg>
                          </span>
                          <label id={`todo-${index}`}>{todo.text}</label>
                        </div>
                        <button onClick={() => deleteTodo(index)} className="btn-clear pointer">
                          <svg className="del-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
              <div className="todo-list__item">
                <span>{filterTodoList("active").length} items left</span>
                <div className="display-sm-none display-md-block">
                  <FilterButton filter={filter} value={"all"} onFilterChange={setFilter} />
                  <FilterButton filter={filter} value={"active"} onFilterChange={setFilter} />
                  <FilterButton filter={filter} value={"completed"} onFilterChange={setFilter} />
                </div>
                <button onClick={clearCompleted} className="btn-clear pointer">Clear Completed</button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="filters display-md-none">
        <FilterButton filter={filter} value={"all"} onFilterChange={setFilter} />
        <FilterButton filter={filter} value={"active"} onFilterChange={setFilter} />
        <FilterButton filter={filter} value={"completed"} onFilterChange={setFilter} />
      </div>

      <p className="txt">Drag and drop to reorder list</p>
    </main>
  )
}

export default Main

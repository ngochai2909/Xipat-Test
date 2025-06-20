import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { Todo, TodoState, FilterType } from "../../types/todo"
import {
  loadTodosFromLocalStorage,
  saveTodosToLocalStorage
} from "../../utils/localStorage"

const initialState: TodoState = {
  todos: loadTodosFromLocalStorage(),
  filter: "all"
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      state.todos.push(newTodo)
      saveTodosToLocalStorage(state.todos)
    },

    updateTodo: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const { id, text } = action.payload
      const todo = state.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.text = text
        todo.updatedAt = new Date()
        saveTodosToLocalStorage(state.todos)
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      saveTodosToLocalStorage(state.todos)
    },

    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
        todo.updatedAt = new Date()
        saveTodosToLocalStorage(state.todos)
      }
    },

    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload
    },

    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed)
      saveTodosToLocalStorage(state.todos)
    }
  }
})

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  setFilter,
  clearCompleted
} = todoSlice.actions

export default todoSlice.reducer

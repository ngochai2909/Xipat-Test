import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "./slices/todoSlice"

export const store = configureStore({
  reducer: {
    todos: todoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "todos/addTodo",
          "todos/updateTodo",
          "todos/toggleTodo"
        ],
        ignoredPaths: ["todos.todos.createdAt", "todos.todos.updatedAt"]
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

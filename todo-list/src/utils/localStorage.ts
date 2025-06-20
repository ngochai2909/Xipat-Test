import type { Todo } from "../types/todo"

const TODOS_KEY = "todos"

export const saveTodosToLocalStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error("Error saving todos to localStorage:", error)
  }
}

export const loadTodosFromLocalStorage = (): Todo[] => {
  try {
    const todos = localStorage.getItem(TODOS_KEY)
    if (todos) {
      const parsedTodos = JSON.parse(todos)
      // Convert date strings back to Date objects
      return parsedTodos.map((todo: Todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt)
      }))
    }
    return []
  } catch (error) {
    console.error("Error loading todos from localStorage:", error)
    return []
  }
}

import React from "react"
import { Empty } from "antd"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import type { Todo } from "../types/todo"
import TodoItem from "./TodoItem"

const TodoList: React.FC = () => {
  const { todos, filter } = useSelector((state: RootState) => state.todos)

  const filteredTodos: Todo[] = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed
      case "completed":
        return todo.completed
      default:
        return true
    }
  })

  if (filteredTodos.length === 0) {
    const emptyMessage =
      filter === "active"
        ? "Không có việc nào đang chờ xử lý"
        : filter === "completed"
        ? "Không có việc nào đã hoàn thành"
        : "Chưa có việc nào trong danh sách"

    return <Empty description={emptyMessage} style={{ margin: "40px 0" }} />
  }

  return (
    <div style={{ marginTop: "16px" }}>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList

import React, { useState } from "react"
import { Checkbox, Input, Button, Space, Typography, Popconfirm } from "antd"
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined
} from "@ant-design/icons"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store"
import type { Todo } from "../types/todo"
import { toggleTodo, updateTodo, deleteTodo } from "../store/slices/todoSlice"

const { Text } = Typography

interface TodoItemProps {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id))
  }

  const handleSave = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      dispatch(updateTodo({ id: todo.id, text: editText.trim() }))
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        border: "1px solid #f0f0f0",
        borderRadius: "8px",
        marginBottom: "8px",
        backgroundColor: todo.completed ? "#f6ffed" : "#ffffff"
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
        style={{ marginRight: "12px" }}
      />

      <div style={{ flex: 1, marginRight: "12px" }}>
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
            style={{ marginRight: "8px" }}
          />
        ) : (
          <Text
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#8c8c8c" : "#262626"
            }}
          >
            {todo.text}
          </Text>
        )}
      </div>

      <Space>
        {isEditing ? (
          <>
            <Button
              type='primary'
              size='small'
              icon={<SaveOutlined />}
              onClick={handleSave}
              disabled={!editText.trim()}
            />
            <Button
              size='small'
              icon={<CloseOutlined />}
              onClick={handleCancel}
            />
          </>
        ) : (
          <>
            <Button
              type='text'
              size='small'
              icon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
              disabled={todo.completed}
            />
            <Popconfirm
              title='Bạn có chắc chắn muốn xóa việc này?'
              onConfirm={handleDelete}
              okText='Có'
              cancelText='Không'
            >
              <Button
                type='text'
                size='small'
                icon={<DeleteOutlined />}
                danger
              />
            </Popconfirm>
          </>
        )}
      </Space>
    </div>
  )
}

export default TodoItem

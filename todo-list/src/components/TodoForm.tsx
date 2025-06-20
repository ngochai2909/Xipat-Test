import React, { useState } from "react"
import { Input, Button, Form } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store"
import { addTodo } from "../store/slices/todoSlice"

const TodoForm: React.FC = () => {
  const [form] = Form.useForm()
  const [inputValue, setInputValue] = useState("")
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()))
      setInputValue("")
      form.resetFields()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <Form
      form={form}
      layout='inline'
      style={{ marginBottom: 24, width: "100%" }}
    >
      <Form.Item style={{ flex: 1 }}>
        <Input
          placeholder='Thêm việc cần làm...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          size='large'
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={handleSubmit}
          size='large'
          disabled={!inputValue.trim()}
        >
          Thêm
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TodoForm

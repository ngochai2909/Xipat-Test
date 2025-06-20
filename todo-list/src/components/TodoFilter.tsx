import React from "react"
import { Radio, Button, Space, Typography } from "antd"
import { ClearOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store"
import type { FilterType } from "../types/todo"
import { setFilter, clearCompleted } from "../store/slices/todoSlice"
import "./TodoFilter.css"

const { Text } = Typography

const TodoFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { filter, todos } = useSelector((state: RootState) => state.todos)

  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.filter((todo) => !todo.completed).length

  const handleFilterChange = (value: FilterType) => {
    dispatch(setFilter(value))
  }

  const handleClearCompleted = () => {
    dispatch(clearCompleted())
  }

  return (
    <div className='todo-filter-container'>
      <Space direction='vertical' size={4} className='todo-filter-controls'>
        <Text type='secondary' className='todo-filter-stats-text'>
          {activeCount} việc chưa hoàn thành, {completedCount} việc đã hoàn
          thành
        </Text>
        <Radio.Group
          className='todo-filter-radio-group'
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          optionType='button'
          buttonStyle='solid'
          size='small'
        >
          <Radio.Button value='all'>Tất cả ({todos.length})</Radio.Button>
          <Radio.Button value='active'>Đang chờ ({activeCount})</Radio.Button>
          <Radio.Button value='completed'>
            Đã hoàn thành ({completedCount})
          </Radio.Button>
        </Radio.Group>
      </Space>

      {completedCount > 0 && (
        <Button
          type='text'
          icon={<ClearOutlined />}
          onClick={handleClearCompleted}
          danger
          className='todo-filter-clear-btn'
        >
          Xóa đã hoàn thành
        </Button>
      )}
    </div>
  )
}

export default TodoFilter

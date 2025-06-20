import React from "react"
import { Layout, Typography, Card } from "antd"
import { CheckSquareOutlined } from "@ant-design/icons"
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import TodoFilter from "./components/TodoFilter"
import "./App.css"

const { Header, Content } = Layout
const { Title } = Typography

const App: React.FC = () => {
  return (
    <Layout className='app-layout'>
      <Header className='app-header'>
        <div className='header-content'>
          <CheckSquareOutlined className='header-icon' />
          <Title level={2} className='header-title'>
            Todo List
          </Title>
        </div>
      </Header>

      <Content className='app-content'>
        <div className='content-container'>
          <Card className='card'>
            <TodoForm />
            <TodoList />
            <TodoFilter />
          </Card>
        </div>
      </Content>
    </Layout>
  )
}

export default App

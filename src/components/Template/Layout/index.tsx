import React, { useState } from 'react';
import { Col, Row, Typography } from 'antd';
import './layout.scss';
import Header from '../Header';
import TodoList from '../TodoList'
const { Text } = Typography;

function Layout(props: any) {
  const [todoList, setTodoList] = useState(false);
  return (
    <>
      <Header showTodoList = {setTodoList} />
      <Row>
        <Col sm={24} className='text-right mb-3' >
          <Text className='project-title'> {props.breadcrumb} </Text>
        </Col>
      </Row>
      <Row>
        <Col className={`${todoList ? 'hide': 'show'} layout-container`}>
          {props.children}
        </Col>
        {todoList && <TodoList />}
      </Row>
    </>

  );
}

export default Layout;

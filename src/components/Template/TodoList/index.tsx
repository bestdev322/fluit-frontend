import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import './todoList.scss';
import { useNavigate, useParams } from 'react-router-dom';

function TodoList(props: any) {
    const navigate = useNavigate();
    return (
        <>
            <Col span={24} md={9} lg={7} sm={12} className='todo-list'>
                <h3 style={{ textAlign: 'center' }}>Lista de Pendências</h3>
                <Col style={{ backgroundColor: '#F5F5F5', padding: 10 }}>
                    <span>1. KN-N1344-290-M-EM-0001 foi submetido para aprovação.</span>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
                        <Button type="primary" style={{ backgroundColor: '#CBCBCB', color: 'black' }} onClick={() => navigate('/measure')}>Verificar</Button>
                        <Button type="primary" style={{ backgroundColor: '#F5B091', color: 'black' }}>Redirecionar</Button>
                    </Col>
                </Col>
            </Col>
        </>
    );
}

export default TodoList;

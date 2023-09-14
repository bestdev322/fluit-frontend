import { Avatar, Badge, Button, Col, Image, Input, Layout, Row, Typography } from 'antd';
import './header.scss';
import logo from '../../../assets/images/logo-fluit.png';
import { BiSolidHome } from 'react-icons/bi';
import { VscGraph } from 'react-icons/vsc';
import { BellFilled } from '@ant-design/icons'
import { HiOutlineLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const { Text } = Typography;

const { Content } = Layout;

function HeaderSystem(props: any) {
    const navigate = useNavigate();
    const [todo, setTodo] = useState(false);

    const handleLogout = (e: any) => {
        localStorage.clear();
        window.location.href = "/login";
    };

    useEffect(() => {
        props.showTodoList(todo);
    }, [todo])


    return (
        <Content className="site-layout header-layout" style={{ margin: '0 auto', paddingTop: '30px' }}  >
            <Row className='header-row pb-1' align={'middle'} >
                <Col>
                    <Image src={logo} preview={false} className='logo' onClick={() => navigate("/home/")} />
                </Col>
                <Col span={15} className='search-desktop'>
                    {/* <Input className='search' placeholder='Pesquisar CWAs' /> */}
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {/* <VscGraph size={25} onClick={() => navigate("/charts/")}/> */}
                    {/* <FaBars size={25}/> */}

                    <Avatar className='avatarImage' >
                        {
                            localStorage.getItem('user_letters')
                        }
                    </Avatar>
                    <Text>{localStorage.getItem('user_name')}</Text>

                    <a onClick={() => setTodo(!todo)}>
                        <Badge count={5} size='small' offset={[0, 24]}>
                            <BellFilled style={{ fontSize: '25px' }} />
                        </Badge>
                    </a>
                    <Col style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }} onClick={handleLogout}>

                        <HiOutlineLogout className='ml-3 ' size={14} />
                        <Text>
                            Logout
                        </Text>
                    </Col>
                </Col>
            </Row>
        </Content>
    );
}

export default HeaderSystem;

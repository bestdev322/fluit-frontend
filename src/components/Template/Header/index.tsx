import { Avatar,  Col, Image, Input, Layout, Row,  Typography } from 'antd';
import './header.scss';
import logo from '../../../assets/images/logo-fluit.png';
import { BiSolidHome } from 'react-icons/bi';
import { VscGraph } from 'react-icons/vsc';
import { FaBars } from 'react-icons/fa';

const { Text } = Typography;

const { Content } = Layout;

function HeaderSystem() {
    return (
        <Content className="site-layout " style={{  width: '1270px', margin: '0 auto' }}  >
            <Row justify={'space-between'} align={'middle'} >
                <Col span={3}>
                    <Image src={logo} preview={false} className='logo mt-4 mb-4' />
                </Col>
                <Col span={1}>
                    <BiSolidHome size={25}/>
                </Col>
                <Col span={15}>
                    <Input className='search' placeholder='Pesquisar CWAs' />
                </Col>
                <Col>
                    <VscGraph size={25}/>
                </Col>
                <Col>
                    <FaBars size={25}/>
                </Col>
                <Col>
                    <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>DZ</Avatar>
                </Col>
                <Col>
                    <Text>Danilo Zeni</Text>
                </Col>
            </Row>
            
        </Content>


    );
}

export default HeaderSystem;

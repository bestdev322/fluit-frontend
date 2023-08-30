import { Avatar,  Col, Image, Input, Layout, Row,  Typography } from 'antd';
import './header.scss';
import logo from '../../../assets/images/logo-fluit.png';
import { BiSolidHome } from 'react-icons/bi';
import { VscGraph } from 'react-icons/vsc';
import { HiOutlineLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const { Content } = Layout;

function HeaderSystem() {
    const navigate = useNavigate();

    const handleLogout = (e: any) => {
        localStorage.clear();
        window.location.href = "/login";
    };


    return (
        <Content className="site-layout header-layout" style={{ margin: '0 auto', paddingTop: '30px' }}  >
            <Row className='header-row pb-1' align={'middle'} >
                <Col>
                    <Image src={logo} preview={false} className='logo' onClick={() => navigate("/home/")} />
                </Col>
                <Col span={15} className='search-desktop'>
                    {/* <Input className='search' placeholder='Pesquisar CWAs' /> */}
                </Col>
                <Col style={{display:'flex', alignItems:'center', gap: '5px'}}>
                    {/* <VscGraph size={25} onClick={() => navigate("/charts/")}/> */}
                    {/* <FaBars size={25}/> */}
                    <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>
                        {
                            localStorage.getItem('user_letters')
                        }                        
                    </Avatar>
                    <Text>{localStorage.getItem('user_name')}</Text>

                    <Col style={{display:'flex', alignItems:'center', gap: '5px', cursor: 'pointer'}} onClick={handleLogout}>
                        
                        <HiOutlineLogout  className='ml-3 ' size={14}/>
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

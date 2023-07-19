import { Button, Col, Image, Input, Row, Typography } from 'antd';

 
import './login.scss';
import logo from '../../assets/images/logo-fluit.png';
import { Link } from 'react-router-dom';

const { Text } = Typography;
function App() {
  return (
    <>
    <Row justify="space-around" align="middle" className='rowLogin'>
      <Col sm={12} md={8} className='mt-6 loginBox'>
        <Col span={24}>
          <Image src={logo} preview={false} className='logo mt-4 mb-4'/>        
        </Col>

        <Col span={24}>
          <Input placeholder='Usuário' className='mb-2' />
        </Col>
        
        <Col span={24}>
          <Input placeholder='Senha' className='mb-3'/>
        </Col>
        
        <Col span={24}>
          <Link to="/cwa">
            <Button className='submit pt-1 pb-1' >Entrar</Button>
          </Link>
        </Col>

        <Col span={24} className='mt-1'>
          <Text >Esqueci minha senha</Text>
        </Col>
        
        
      </Col>
    </Row>
    </>
    
  );
}

export default App;

import { Button, Col, Image, Input, Row, Space, Typography } from 'antd';
import './layout.scss';
import logo from '../../assets/images/logo-fluit.png';
import Header from '../Header';

const { Text } = Typography;

function Layout(props: any) {

    return (
    <>
      
        <Header />
        <Row>
          <Col className='' style={{ width: '1270px', margin: '0 auto' }} >            
            {props.children}          
          </Col>
        </Row>
        
    </>
    
  );
}

export default Layout;

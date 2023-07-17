import {  Col,  Row } from 'antd';
import './layout.scss';
import Header from '../Header';


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

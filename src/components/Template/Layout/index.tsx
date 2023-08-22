import {  Col,  Row } from 'antd';
import './layout.scss';
import Header from '../Header';


function Layout(props: any) {

    return (
    <>
      
        <Header />
        <Row>
          <Col className='layout-container'>            
            {props.children}          
          </Col>
        </Row>
        
    </>
    
  );
}

export default Layout;

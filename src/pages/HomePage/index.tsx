import {  Card, Col, Row, Typography } from 'antd';
import { AiOutlineDatabase } from 'react-icons/ai';
import Layout from '../../components/Template/Layout';
import './homePage.scss';
import { Link, useNavigate } from 'react-router-dom';


const { Text } = Typography;

function HomePage() {
  
  const navigate = useNavigate();


  return (
    <>
      <Layout>
        <Row>
          <Col sm={24} className='text-right mb-3' >
            <Text className='project-title'> _</Text>
          </Col>
        </Row>    
        <Card size="small" title="Home" extra={''}>
          <Row align={'middle'} className='mt-4 mb-6'>
            <Col className='dashboard-menu' onClick={() => navigate("/projects")}>
              <Col className='text-center'>
                <AiOutlineDatabase size={'4em'}/>
              </Col>
              <Col className='text-center'>
                <Text>Projetos</Text>
              </Col>
            </Col>
          </Row>
        </Card>
      </Layout>
    </>

  );
}

export default HomePage;

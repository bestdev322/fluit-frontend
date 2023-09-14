import './measurePage.scss'
import Layout from '../../components/Template/Layout';
import api from '../../services/Api';
import { Card, Col, Row, Table, TableColumnsType, Typography, Modal, message, Input, Upload, Divider, ConfigProvider, Spin, Button } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
const { Text } = Typography;

interface DataType {
  key: React.Key;
  content: string;
  children?: DataType[];
}

function MeasurePage() {

  const dataTable: DataType[] = [
    {
      key: 1,
      content: 'KN-N1344-290-M-EM-0001',
      children: [
        {
          key: 2,
          content: 'Construção',
          children: [
            {
              key: 3,
              content: 'Montar equipamentos mecânicos - CH-1290KN-01',
              children: [
                {
                  key: 4,
                  content: 'Instalação na base de equipamentos'
                }
              ]
            }
          ]
        }
      ]
    }
  ]

  const columns: TableColumnsType<DataType> = [
    { title: 'Medição', dataIndex: 'content', key: 'content' },
  ];

  return (
    <>
      <Layout breadcrumb='project 1'>
        <Card size="small" extra={''} className='measure-card'>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col span={24} style={{ padding: 20 }}>
              <Col className='measure-body'>
                <Col span={24}>
                  <Table
                    className='table-measure'
                    columns={columns}
                    dataSource={dataTable}
                    pagination={false}
                    size='small'
                    style={{ minWidth: '600px' }}
                  />
                </Col>
                <Row style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: 20 }}>
                  <span>Montar equipamentos mecânicos - CH-1290KN-01</span>
                  <span>R$80.750</span>
                </Row>
                <Row style={{ width: '100%' }}>
                  <Col style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                      <Button type='link' icon={<FileSearchOutlined label='hello' />} style={{color: 'black'}} >
                        1. Foto de campo 1.jpg
                      </Button>
                    </div>
                    <div style={{ paddingLeft: 20 }}>
                      <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style={{ height: 120 }} />
                    </div>
                    <div>
                      <Button type='link' icon={<FileSearchOutlined label='hello' />} style={{color: 'black'}} >
                        2. Relatório.pdf
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Col span={24} style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
                  <Button type="primary" style={{backgroundColor: '#7BBC76', color: 'black'}}>Aprovar Medição</Button>
                  <Button type="primary" style={{backgroundColor: '#C71E1E', color: 'white'}}>Reprovar Medição</Button>
                </Col>
                <Divider orientation="left" plain>
                  Histórico
                </Divider>
                <Col style={{ display: 'flex', flexDirection: 'column', paddingLeft: 30, minHeight: 100 }}>
                  <span>03/05/2023 às 15h18: Atividade realizada em campo sem impedimento.</span>
                  <span>03/05/2023 às 15h23: Submetido para aprovação.</span>
                </Col>
              </Col>
            </Col>
          </Row>
        </Card>
      </Layout>
    </>
  );
}

export default MeasurePage;

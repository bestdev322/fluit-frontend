import { Badge,  Card, Col, Row, Table, TableColumnsType, Typography } from 'antd';
import './cwaPage.scss';
import Layout from '../../components/Template/Layout';
import { ReactNode } from 'react';
import Entrega from '../../components/Entrega';

const { Text } = Typography;

  interface DataType {
    key: React.Key;
    name: string;
    description: string;    
  }
  
  interface ExpandedDataType {
    key: React.Key;
    name: string;
    area: string;
    disciplina: string;
    subdisciplina: string;
    state: Object;
  }

function CwaPage() { 
  
    const expandedRowRender = (record :any , index :any , indent:any , expanded:any ): ReactNode => {
      console.log(record, index, indent, expanded)
      const columns: TableColumnsType<ExpandedDataType> = [
        { title: 'Nome', dataIndex: 'name', key: 'name' },
        { title: 'Área', dataIndex: 'area', key: 'area' },
        { title: 'Disciplina', dataIndex: 'disciplina', key: 'disciplina' },
        { title: 'Subdisciplina', dataIndex: 'subdisciplina', key: 'subdisciplina' },
        {
          title: 'Status',
          dataIndex: 'state',
          key: 'state',
          
        },        
      ];
  
      const data = [
        {
          key: 1,          
          name: 'KN-N1344-290-B-BT-0001',
          area: 'Geral',
          disciplina: 'Infra',
          subdisciplina: 'Terraplanagem',
          state: <Badge status="success" text="Finalizado" />,
        },
        {
          key: 2,
          name: 'KN-N1344-290-B-BT-0001',
          area: 'Geral',
          disciplina: 'Infra',
          subdisciplina: 'Terraplanagem',
          state: <Badge status="success" text="Finalizado" />,
        },
        {
          key: 3,
          name: 'KN-N1344-290-M-EM-0001',
          area: 'Geral',
          disciplina: 'Infra',
          subdisciplina: 'Terraplanagem',
          state: <Badge status="processing" text="Em andamento" />,
        },
        {
          key: 4,
          name: 'KN-N1344-290-E-BD-0001',
          area: 'Geral',
          disciplina: 'Infra',
          subdisciplina: 'Terraplanagem',
          state: <Badge status="warning" text="Não iniciado" />,
        }

      ];
      
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };
  
    const columns: TableColumnsType<DataType> = [
      { title: 'Nome', dataIndex: 'name', key: 'name' },      
      { title: 'Descrição', dataIndex: 'description', key: 'description' },
    ];
  
    const data: DataType[] = [
      {
        key: 1,
        name: 'KN-N1344-290',
        description: 'N2 - Mina - Geral',        
      },
      {
        key: 2,
        name: 'KN-N1344-330',
        description: 'TR-1391KN-01 - Região 3 (N1-N2 plano) - Geral',        
      },
      {
        key: 3,
        name: 'KN-N1344-400',
        description: 'TR-1391KN-02 - Geral - Geral',        
      },
      {
        key: 4,
        name: 'KN-N1344-500',
        description: 'TR-1391KN-03 - Geral - Geral',        
      },
      {
        key: 5,
        name: 'KN-N1344-711',
        description: 'TR-1391KN-05/06 - Região 1 - Parte 1 (CT)',        
      },
    
    ];
    

  return (
    <>
     <Layout>
      <Row>
        <Col sm={24} className='text-right mb-3' >
          <Text className='project-title'> Projeto A</Text>
        </Col>
      </Row>
      <Card size="small" title="CWA - Áreas do Projeto" extra={''} style={{ width: 1270 }}>
        <Row>
          <Col span={24}>
            <Table
              className='table-cwa'
              columns={columns}
              expandable={{ expandedRowRender }}
              dataSource={data}
            />
          </Col>
        </Row>
        
      </Card>
     </Layout>

     <Entrega />
    </>
    
  );
}

export default CwaPage;

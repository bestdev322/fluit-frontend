import { Badge,  Button,  Card, Col, Row, Table, TableColumnsType, Typography } from 'antd';
import './cwaPage.scss';
import Layout from '../../components/Template/Layout';
import { ReactNode, useEffect, useState } from 'react';
import Entrega from '../../components/Entrega';
import api from '../../services/Api';
import { useNavigate } from 'react-router-dom';

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

  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(3);
  const [total, setTotal] = useState(0);
  const [dataTable, setDataTable] = useState();
  const [fetchingData, setFetchingData] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const navigate = useNavigate();
  
    const expandedRowRender = (record :any , index :any , indent:any , expanded:any ): ReactNode => {      
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
      

      ];
      
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    useEffect( () => {
      setFetchingData(true)
      api.get("http://localhost/api/v1/projects/"+1+"/cwas")
      .then((response) => {
        if(response.status === 200){
          const data = response.data.data;
          console.log(data)
          const table = data.map( (obj:any) => ({
            ...obj,
            key: obj.id,
            actions: <>
              <Button type="primary" onClick={() => navigate("/cwas/"+obj.id)}>
                Abrir
              </Button>
            </> 
          }));

          setDataTable(table);                   
          setTotal(data.total)
          setPageSize(data.per_page)
          setIsLoading(false);
          setFetchingData(false)
        }

      });

    }, []); 
  
    const columns: TableColumnsType<DataType> = [
      { title: 'Código', dataIndex: 'cwa_code', key: 'cwa_code' },      
      { title: 'Descrição', dataIndex: 'description', key: 'description' },
          
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
              dataSource={dataTable}
              loading={fetchingData}
            />
          </Col>
        </Row>
        
      </Card>
     </Layout>

     
    </>
    
  );
}

export default CwaPage;

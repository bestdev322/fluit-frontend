import { Badge,  Button,  Card, Col, Row, Table, TableColumnsType, Typography } from 'antd';
import './projectsPage.scss';
import Layout from '../../components/Template/Layout';
import { ReactNode, useEffect, useState } from 'react';
import api from '../../services/Api';

import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { AnyARecord } from 'dns';
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

function ProjectsPage() { 
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState(3);
  const [total, setTotal] = useState(0);
  const [dataTable, setDataTable] = useState();
  const [pageSize, setPageSize] = useState(0);
  const navigate = useNavigate();

const onChange: PaginationProps['onChange'] = (page) => {
  console.log(page);
  setCurrent(page);
};
 
    useEffect( () => {
      api.get("/v1/projects/all")
      .then((response) => {
        if(response.status === 200){
          const data = response.data.data;

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
        }

      });

    }, []); 

    const columns: TableColumnsType<DataType> = [
      { title: 'Nome', dataIndex: 'name', key: 'name' },      
      { title: 'Descrição', dataIndex: 'description', key: 'description' },
      { title: '', dataIndex: 'actions', key: 'actions' },      
    ];
  
  return (
    <>
     <Layout>
      <Row>
        <Col sm={24} className='text-right mb-3' >
          <Text className='project-title'> Projeto A</Text>
        </Col>
      </Row>
      <Card size="small" title="Projetos" extra={''}>
        <Row>
          <Col span={24}>
            <Table
              className='table-projects'
              columns={columns}              
              dataSource={dataTable}
              pagination={false}
              loading={isLoading}
              locale={{ emptyText: 'Sem dados' }}
            />
          </Col>

          <Col span={24} className='text-center mt-4'>
            <Pagination current={current} onChange={onChange} total={total} simple={false} showSizeChanger={false} />
          </Col>          
        </Row> 
      </Card>
     </Layout>     
    </>
  );
}

export default ProjectsPage;

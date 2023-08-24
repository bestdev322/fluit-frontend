import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './wpPage.scss'
import Layout from '../../components/Template/Layout';
import api from '../../services/Api';
import { Badge, Button, Card, Col, Row, Table, TableColumnsType, Typography, message, Input } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';

const { Text } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  area: string;
  description: string;
  subdisciplina: string;
  state: Object;
}

function WpPage() {
  const { cwa_id } = useParams();
  const [dataTable, setDataTable] = useState();
  const [fetchingData, setFetchingData] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setFetchingData(true)
    api.get("/v1/cwas/" + cwa_id + "/wps")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data)
          const data = response.data.data;
          const table = data.map((obj: any) => ({
            ...obj,
            key: obj.id
          }));

          setDataTable(table);
          setFetchingData(false)
        }

      });

  }, []);

  const columns: TableColumnsType<DataType> = [
    { title: 'Nome', dataIndex: 'name', key: 'name', render: (name, record) => (<a style={{color: 'black'}} onClick={() => navigate("/ewp/" + record.key)}>{name}</a>) },
    { title: 'Descrição', dataIndex: 'description', key: 'description' },
    { title: 'Disciplina', dataIndex: 'discipline_id', key: 'discipline_id' },
    { title: 'Subdisciplina', dataIndex: 'sub_discipline_id', key: 'sub_discipline_id' },
    { title: 'Status', dataIndex: 'state', key: 'state' },
  ];

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <>
      <Layout>
        <Row>
          <Col sm={24} className='text-right mb-3' >
            <Text className='project-title'> Projeto A</Text>
          </Col>
        </Row>
        <Card size="small" title="CWA - Áreas do Projeto" extra={''}>
          <Row>
            <Col span={24} style={{ overflow: 'auto' }}>
              <Table
                className='table-cwa'
                columns={columns}
                rowSelection={rowSelection}
                dataSource={dataTable}
                loading={fetchingData}
                pagination={false}
                scroll={{ y: 350 }}
                locale={{ emptyText: 'Sem dados' }}
                size='small'
                style={{ minWidth: '600px' }}
              />
            </Col>
          </Row>
          <Row justify={'center'} className='table-insert'>
            <Col span={6}><Input placeholder="Nome" /></Col>
            <Col span={6}><Input placeholder="Disciplina" /></Col>
            <Col span={6}><Input placeholder="Subdisciplina" /></Col>
            <Col span={4} sm={3} lg={2}><Button type="primary">Inserir</Button></Col>
          </Row>
        </Card>
      </Layout>
    </>
  );
}

export default WpPage;

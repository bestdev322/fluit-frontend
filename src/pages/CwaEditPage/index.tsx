import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './cwaEditPage.scss'
import Layout from '../../components/Template/Layout';
import api from '../../services/Api';
import { Button, Card, Col, Row, Table, TableColumnsType, Typography, Input } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';

const { Text } = Typography;
const { TextArea } = Input;

interface DataType {
  key: React.Key;
  name: string;
  description: string;
}

function CwaEditPage() {

  const [dataTable, setDataTable] = useState();
  const [fetchingData, setFetchingData] = useState(false);
  const { project_id } = useParams();
  const navigate = useNavigate();

  const columns: TableColumnsType<DataType> = [
    { title: 'Código', dataIndex: 'cwa_code', key: 'cwa_code', render: (cwa_code, record) => (<a style={{ color: 'black' }} onClick={() => navigate("/wps/" + record.key)}>{cwa_code}</a>) },
    { title: 'Descrição', dataIndex: 'description', key: 'description' },
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

  useEffect(() => {
    setFetchingData(true)
    api.get("/v1/projects/" + project_id + "/cwas")
      .then((response) => {
        if (response.status === 200) {
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
            <Col span={7}><Input placeholder="Nome" /></Col>
            <Col span={12}><Input placeholder="Descrição" /></Col>
            <Col span={4} sm={3} lg={2}><Button type="primary">Inserir</Button></Col>
          </Row>
        </Card>
      </Layout>
    </>
  );
}

export default CwaEditPage;

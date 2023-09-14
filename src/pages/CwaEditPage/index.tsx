import { Key, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './cwaEditPage.scss'
import Layout from '../../components/Template/Layout';
import api from '../../services/Api';
import { Button, Card, Col, Row, Table, TableColumnsType, Typography, Input } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import { MinusCircleFilled } from '@ant-design/icons';
const { Text } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  description: string;
}

function CwaEditPage() {

  const [dataTable, setDataTable] = useState<any>([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedKey, setSelectedKey] = useState<Key>();
  const { project_id } = useParams();
  const navigate = useNavigate();

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Código', dataIndex: 'cwa_code', key: 'cwa_code',
      render: (cwa_code, record) => {
        if (record.key == selectedKey) return <><span style={{ color: 'black' }}>{cwa_code}</span> <a onClick={() => removeRecord(record.key)}><MinusCircleFilled style={{ color: 'red', marginLeft: 20 }} /></a></>;
        return <a style={{ color: 'black' }} onClick={() => navigate("/wps/" + record.key)}>{cwa_code}</a>
      }
    },
    { title: 'Descrição', dataIndex: 'description', key: 'description' },
  ];

  const rowSelection: TableRowSelection<DataType> = {
    onSelect: (record) => {
      setSelectedKey(record.key);
    },
  };

  const removeRecord = (key: Key) => {
    const newData = dataTable.filter((item: any) => item.key !== key);
    setDataTable(newData);
  }

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

  const insertHandle = () => {
    if (name == '') return false;
    setDataTable([...dataTable, { key: 'new', cwa_code: name, description: description }]);
  }


  return (
    <>
      <Layout breadcrumb='Projeto A'>
        <Card size="small" title="CWA - Áreas do Projeto" extra={''}>
          <Row>
            <Col span={24} style={{ overflow: 'auto' }}>
              <Table
                className='table-cwa'
                columns={columns}
                rowSelection={{
                  type: 'radio',
                  ...rowSelection,
                }}
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
            <Col span={7}><Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} /></Col>
            <Col span={12}><Input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} /></Col>
            <Col span={4} sm={3} lg={2}><Button type="primary" onClick={insertHandle}>Inserir</Button></Col>
          </Row>
        </Card>
      </Layout>
    </>
  );
}

export default CwaEditPage;

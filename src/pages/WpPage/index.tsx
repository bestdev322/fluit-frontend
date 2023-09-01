import { Key, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './wpPage.scss'
import Layout from '../../components/Template/Layout';
import api from '../../services/Api';
import { Badge, Button, Card, Col, Row, Table, TableColumnsType, Typography, message, Input } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import { MinusCircleFilled } from '@ant-design/icons';

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
  const [dataTable, setDataTable] = useState<any>([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subdescription, setSubDescription] = useState('');
  const [selectedKey, setSelectedKey] = useState<Key>();
  const navigate = useNavigate();


  useEffect(() => {
    setFetchingData(true)
    api.get("/v1/cwas/" + cwa_id + "/wps")
      .then((response) => {
        if (response.status === 200) {
          const table = response.data.data.map((obj: any) => ({
            key: obj.id,
            name: obj.name,
            description: obj.discipline_name,
            subdisciplina: obj.sub_discipline_name,
            area: 'Geral',
            state: 'Finalizado'
          }));

          setDataTable(table);
          setFetchingData(false)
        }

      });

  }, []);

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Nome', dataIndex: 'name', key: 'name', render: (name, record) => {
        if (record.key == selectedKey) return <><span style={{ color: 'black' }}>{name}</span> <a onClick={() => removeRecord(record.key)}><MinusCircleFilled style={{ color: 'red', marginLeft: 20 }} /></a></>;
        return <a style={{ color: 'black' }} onClick={() => navigate("/ewp/" + record.key)}>{name}</a>
      }
    },
    { title: 'Área', dataIndex: 'area', key: 'area' },
    { title: 'Disciplina', dataIndex: 'description', key: 'description' },
    { title: 'Subdisciplina', dataIndex: 'subdisciplina', key: 'subdisciplina' },
    { title: 'Status', dataIndex: 'state', key: 'state' },
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

  const insertHandle = () => {
    if (name == '') return false;
    setDataTable([...dataTable, { name: name, description: description, subdisciplina: subdescription, state: 'Finalizado', area: 'Geral' }]);
  }

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
            <Col span={6}><Input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} /></Col>
            <Col span={6}><Input placeholder="Disciplina" value={description} onChange={e => setDescription(e.target.value)} /></Col>
            <Col span={6}><Input placeholder="Subdisciplina" value={subdescription} onChange={e => setSubDescription(e.target.value)} /></Col>
            <Col span={4} sm={3} lg={2}><Button type="primary" onClick={insertHandle}>Inserir</Button></Col>
          </Row>
        </Card>
      </Layout>
    </>
  );
}

export default WpPage;

import { Key, ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './cwaPage.scss'
import Layout from '../../components/Template/Layout';
import api from '../../services/Api';
import { Badge, Button, Card, Col, Row, Table, TableColumnsType, Typography, Modal, message, Input, Upload, Divider } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { TableRowSelection } from 'antd/es/table/interface';
import { ClockCircleOutlined, FileSearchOutlined, CloudUploadOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;

interface DataType {
  key: React.Key;
  name: string;
  description: string;
}

interface ExpandedDataType {
  key: React.Key;
  name: string;
  area: string;
  description: string;
  subdisciplina: string;
  state: Object;
}

interface ExpandedData1Type {
  key: React.Key;
  state: Object;
  category: string;
  type: string;
}

interface ExpandedData2Type {
  key: React.Key;
  state: Object;
  content: Object;
}

function CwaPage() {

  const [dataTable, setDataTable] = useState();
  const [projectName, setProjectName] = useState('');
  const [dataTable1, setDataTable1] = useState([]);
  const [dataTable2, setDataTable2] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [fetchingData2, setFetchingData2] = useState(false);
  const [fetchingData3, setFetchingData3] = useState(false);
  const [fetchingData4, setFetchingData4] = useState(false);
  const [fetchingData5, setFetchingData5] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { project_id } = useParams();
  const navigate = useNavigate();

  const columns: TableColumnsType<DataType> = [
    { title: 'Código', dataIndex: 'cwa_code', key: 'cwa_code', render: (cwa_code, record) => (<a style={{ color: 'black' }} onClick={() => navigate("/wps/" + record.key)}>{cwa_code}</a>) },
    { title: 'Descrição', dataIndex: 'description', key: 'description' },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const expandedRowRender = (record: any, index: any, indent: any, expanded: any): ReactNode => {
    const expandedRowRender = (record: any, index: any, indent: any, expanded: any): ReactNode => {
      const expandedRowRender = (record: any, index: any, indent: any, expanded: any): ReactNode => {
        const expandedRowRender = (record: any, index: any, indent: any, expanded: any): ReactNode => {
          const columns: TableColumnsType<ExpandedData2Type> = [
            { title: 'State', dataIndex: 'state', key: 'state', width: '50px' },
            { title: 'Content', dataIndex: 'content', key: 'content' },
            { title: 'Status', dataIndex: 'status', key: 'status' },
          ];

          const data = [
            {
              key: 11,
              state: <Badge status="success" />,
              content: <a onClick={showModal} style={{ color: '#DA4F37' }}><ClockCircleOutlined style={{ padding: "4px" }} /><FileSearchOutlined style={{ padding: "4px" }} />1. Instalação na base de equipamentos</a>,
              status: 'Em andamento',
            },
            {
              key: 22,
              state: <Badge status="processing" />,
              content: <a style={{ color: '#DA4F37' }}><ClockCircleOutlined style={{ padding: "4px" }} /><FileSearchOutlined style={{ padding: "4px" }} />2. Alinhamento / Nivelamento e demais conexões</a>,
              status: 'Não iniciado',
            },
          ];

          return <Table 
                    columns={columns} 
                    dataSource={data} 
                    showHeader={false} 
                    pagination={false} 
                    loading={fetchingData2}
                    locale={{ emptyText: 'Sem dados' }}
                />;
        }
        const columns: TableColumnsType<ExpandedData2Type> = [
          { title: 'State', dataIndex: 'state', key: 'state', width: '30px' },
          { title: 'Content', dataIndex: 'content', key: 'content' },
        ];

        const data = [
          {
            key: 11,
            state: <Badge status="success" />,
            content: 'Realizar a prontidão do CWP de equipamentos mecânicos - CH-1290KN-01',
          },
          {
            key: 22,
            state: <Badge status="default" />,
            content: 'Montar equipamentos mecânicos - CH-1290KN-01',
          },
        ];

        return <Table columns={columns} 
                      dataSource={data} 
                      expandable={{ expandedRowRender }} 
                      showHeader={false} 
                      pagination={false} 
                      loading={fetchingData3}
                      locale={{ emptyText: 'Sem dados' }}
                  />;
      }
      const columns: TableColumnsType<ExpandedData1Type> = [
        { title: 'Content', dataIndex: 'content', key: 'content', width: '25%' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
      ];

      const data = [
        {
          key: 11,
          state: <Badge status="success" />,
          category: 'Engenharia',
          type: 'EWP',
        },
        {
          key: 22,
          state: <Badge status="default" />,
          category: 'Fornecimento',
          type: 'PWP',
        },
      ];

      return <Table columns={columns} 
                    dataSource={dataTable2[record.id]} 
                    expandable={{ expandedRowRender }} 
                    showHeader={false} 
                    pagination={false} 
                    loading={fetchingData4}
                    locale={{ emptyText: 'Sem dados' }}
              />;
    }

    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Nome', dataIndex: 'name', key: 'name', render: (name, record) => (<a style={{ color: 'black' }} onClick={() => navigate("/ewp/" + record.key)}>{name}</a>) },
      { title: 'Descrição', dataIndex: 'description', key: 'description' },
      { title: 'Disciplina', dataIndex: 'discipline_id', key: 'discipline_id' },
      { title: 'Subdisciplina', dataIndex: 'sub_discipline_id', key: 'sub_discipline_id' },
      { title: 'Status', dataIndex: 'state', key: 'state' },
    ];

    const data = [
      {
        key: 1,
        name: 'KN-N1344-290-B-BT-0001',
        area: 'Geral',
        description: 'Infra',
        subdisciplina: 'Terraplanagem',
        state: <Badge status="success" text="Finalizado" />,
      },
      {
        key: 2,
        name: 'KN-N1344-290-B-BT-0002',
        area: 'Geral',
        description: 'Infra',
        subdisciplina: 'Terraplanagem',
        state: <Badge status="success" text="Finalizado" />,
      },
    ]
    // console.log(dataTable1[record.id])
    return <Table columns={columns} 
                  dataSource={dataTable1[record.id]} 
                  onExpandedRowsChange={(e) => setExpandedData2(e[e.length - 1])} 
                  expandable={{ expandedRowRender }} 
                  pagination={false} 
                  locale={{ emptyText: 'Sem dados' }}
                  loading={fetchingData5}
                />;
  };

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

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file as RcFile);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const setExpandedData1 = (key: Key) => {
    if (!key) return false;
    api.get("/v1/cwas/" + key + "/wps")
      .then((response) => {
        setFetchingData2(true)
        if (response.status === 200) {
          const data1 = response.data.data.map((obj: any) => ({
            ...obj,
            key: obj.id,
          }));
          setDataTable1({...dataTable1, [key]: data1});
        }
        setFetchingData2(false)
      });
  }

  const setExpandedData2 = (key: Key) => {
    if (!key) return false;
      setFetchingData2(true)
    api.get("/v1/wps/" + key + "/activities")
      .then((response) => {
        if (response.status === 200) {
          const data2 = response.data.data.map((obj: any) => ({
            key: obj.id,
            content: obj.type == 'EWP' ? 'Engenharia' : obj.type == 'PWP' ? 'Fornecimento' : 'Construção',
            type:obj.type
          }));
          setDataTable2({...dataTable2, [key]: data2});
          setFetchingData2(false)
        }
      });
  }

  useEffect(() => {
    setFetchingData(true)

    api.get("/v1/projects/" + project_id )
      .then((response) => {
        if (response.status === 200) {
          setProjectName(response.data.name)
        }
      });


    api.get("/v1/projects/" + project_id + "/cwas")
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.data;
          const table = data.map((obj: any) => ({
            ...obj,
            key: obj.id,
            actions: <>
              <Button type="primary" onClick={() => navigate("/cwas/" + obj.id)}>
                Abrir
              </Button>
            </>
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
            <Text className='project-title'> { projectName ?? '_' }</Text>
          </Col>
        </Row>
        <Card size="small" title="CWA - Áreas do Projeto" extra={''}>
          <Row>
            <Col span={24} style={{ overflow: 'auto' }}>
              <Table
                className='table-cwa'
                columns={columns}
                rowSelection={rowSelection}
                expandable={{ expandedRowRender }}
                onExpandedRowsChange={(e) => setExpandedData1(e[e.length - 1])}
                dataSource={dataTable}
                loading={fetchingData}
                locale={{ emptyText: 'Sem dados' }}
                pagination={false}
                // scroll={{ y: 350 }}
                size='small'
                style={{ minWidth: '600px' }}
              />
            </Col>
          </Row>
          {/* <Row justify={'center'} className='table-insert'>
            <Col span={7} onClick={() => navigate("/cwas_edit/" + project_id)}><Input placeholder="Nome" /></Col>
            <Col span={12} onClick={() => navigate("/cwas_edit/" + project_id)}><Input placeholder="Descrição" /></Col>
            <Col span={4} sm={3} lg={2}><Button type="primary">Inserir</Button></Col>
          </Row> */}
        </Card>
        <Modal footer={null} closeIcon={true} width={600} className='measure-modal' open={isModalOpen} onCancel={handleCancel}>
          <Row>
            <Col span={24} className='measure-modal-header'>
              Medição
            </Col>
          </Row>
          <Row className='measure-modal-sub-header'>
            <Col span={24}>
              <Row>
                <Col className='modal-name' span={24}>KN-N1344-290-M-EM-0001</Col>
              </Row>
              <Row>
                <Col className='modal-description text-ellipsis' span={24}>Montar equipamentos mecânicos - CH-1290KN-01</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24} className='modal-body'>
              <Row justify={'space-between'} style={{ padding: '10px 0px' }}>
                <Col>1. Instalação na base de equipamentos</Col>
                <Col>R$80.750</Col>
              </Row>
              <Row>
                <Col span={24}>
                  <TextArea rows={4} placeholder='Comentários' />
                </Col>
              </Row>
              <Row style={{ padding: '10px 0px' }}>
                <Col span={12} style={{ textAlign: 'center' }}>
                  <Upload {...props} showUploadList={false} className='upload-cloud-btn'>
                    <Button icon={<CloudUploadOutlined />}>Selecionar arquivos...</Button>
                  </Upload>
                </Col>
                <Col span={12} style={{ textAlign: 'center' }}>
                  <Button onClick={handleUpload} className='modal-upload-button' disabled={fileList.length === 0} loading={uploading} type="primary">Submeter para aprovação</Button>
                </Col>
              </Row>
              <Divider orientation="left" style={{ margin: '0px' }} plain>
                Lista de arquivos
              </Divider>
              <Upload className='uploaded-file-list' fileList={fileList}></Upload>
              <Divider orientation="left" style={{ margin: '0px' }} plain>
                Histórico
              </Divider>
              <div style={{ minHeight: '100px', paddingLeft: '30px' }}>
                <div className='text-ellipsis'>03/05/2023 às 15h18: Atividade realizada em campo sem impedimento.</div>
                <div className='text-ellipsis'>03/05/2023 às 15h23: Submetido para aprovação.</div>
              </div>
            </Col>
          </Row>
        </Modal>
      </Layout>
    </>
  );
}

export default CwaPage;

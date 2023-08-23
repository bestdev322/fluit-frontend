import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [fetchingData, setFetchingData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

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

          return <Table columns={columns} dataSource={data} showHeader={false} pagination={false} />;
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

        return <Table columns={columns} dataSource={data} expandable={{ expandedRowRender }} showHeader={false} pagination={false} />;
      }
      const columns: TableColumnsType<ExpandedData1Type> = [
        { title: 'State', dataIndex: 'state', key: 'state', width: '20px' },
        { title: 'Category', dataIndex: 'category', key: 'category', width: '25%' },
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

      return <Table columns={columns} dataSource={data} expandable={{ expandedRowRender }} showHeader={false} pagination={false} />;
    }
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Nome', dataIndex: 'name', key: 'name', render: (name) => (<a>{name}</a>) },
      { title: 'Área', dataIndex: 'area', key: 'area' },
      { title: 'Disciplina', dataIndex: 'description', key: 'description' },
      { title: 'Subdisciplina', dataIndex: 'subdisciplina', key: 'subdisciplina' },
      { title: 'Status', dataIndex: 'state', key: 'state' },
    ];

    api.get("/v1/cwas/" + record.id + "/wps")
      .then((response) => {
        if (response.status === 200) {
          const data2 = response.data.data;
          console.log(response.data)
          const table2 = data2.map((obj: any) => ({
            ...obj,
            key: obj.id,
            actions: <>
              <Button type="primary" onClick={() => navigate("/cwas/" + obj.id)}>
                Abrir
              </Button>
            </>
          }));

          // setDataTable(table);
          // setFetchingData(false)
        }

      });

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
    ];

    return <Table columns={columns} dataSource={data} expandable={{ expandedRowRender }} pagination={false} />;
  };

  useEffect(() => {
    setFetchingData(true)
    api.get("/v1/projects/" + 1 + "/cwas")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data)
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

  const columns: TableColumnsType<DataType> = [
    { title: 'Código', dataIndex: 'cwa_code', key: 'cwa_code', render: (cwa_code, record) => (<a onClick={() => navigate("/wps/" + record.key)}>{cwa_code}</a>) },
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
                expandable={{ expandedRowRender }}
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

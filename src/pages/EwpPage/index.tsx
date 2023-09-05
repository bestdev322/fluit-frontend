import { Badge, Breadcrumb, Card, Col, Progress, RadioChangeEvent, Row, Table, Tabs, Typography } from 'antd';

import './ewpPage.scss';
import Layout from '../../components/Template/Layout';
import { useEffect, useState } from 'react';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useParams } from 'react-router-dom';
import api from '../../services/Api';

const { Text } = Typography;

function EwpPage() {
  const { wp_id } = useParams();
  const [size, setSize] = useState<SizeType>('small');
  const [items, setItems] = useState<any>([]);

  const groupByKey = (list: any, key: any) => list.reduce((hash: any, obj: any) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {})

  const dataSource = [
    {
      key: '1',
      atividades: 'Certificar desenhos de fornecedor e liberar para construção - CH-1290KN-01',
      responsavel: 'Contratada T',
      progresso: <Progress percent={33} status="active" />

    },
    {
      key: '2',
      atividades: 'Elaborar documentos para fornecimento de equipamentos mecânicos - CH-1290KN-01',
      responsavel: 'Contratada J',
      progresso: <Progress percent={98} status="active" />
    },
  ];

  const dataSource2 = [
    {
      key: '1',
      atividades: 'Elaborar desenhos de fabricação e montagem de equipamentos mecânicos - CH-1290KN-01',
      responsavel: 'Contratada X',
      progresso: <Progress percent={28} status="active" />
    },
    {
      key: '2',
      atividades: 'Fornecer equipamentos mecânicos - CH-1290KN-01',
      responsavel: 'Contratada Z',
      progresso: <Progress percent={75} status="active" />
    },
    {
      key: '3',
      atividades: 'Transportar e entregar equipamentos mecânicos no site - CH-1290KN-01',
      responsavel: 'Contratada Z',
      progresso: <Progress percent={97} status="active" />
    }
  ];

  const dataSource3 = [
    {
      key: '1',
      atividades: 'Realizar a prontidão do CWP de equipamentos mecânicos - CH-1290KN-01',
      responsavel: 'Contratada T',
      progresso: <Progress percent={33} status="active" />

    },
    {
      key: '2',
      atividades: 'Montar equipamentos mecânicos - CH-1290KN-01',
      responsavel: 'Contratada J',
      progresso: <Progress percent={50} status="active" />
    },
    {
      key: '3',
      atividades: 'Realizar verificação da qualidade mecânica - CH-1290KN-01',
      responsavel: 'Contratada T',
      progresso: <Progress percent={43} status="active" />

    },
    {
      key: '4',
      atividades: 'Formalizar a completação mecânica do TWP - CH-1290KN-01',
      responsavel: 'Contratada J',
      progresso: <Progress percent={98} status="active" />
    },
  ];

  const dataSource4 = [
    {
      key: '1',
      descricao: 'Lorem Ipsum - CH-1290KN-01',
      responsavel: 'Contratada T',
      progresso: <Progress percent={33} status="active" />

    },
    {
      key: '2',
      descricao: 'Lorem Ipsum - CH-1290KN-01',
      responsavel: 'Contratada J',
      progresso: <Progress percent={98} status="active" />
    },
  ];

  const columns = [
    {
      title: 'Atividades',
      dataIndex: 'atividades',
      key: 'atividades',
    },
    {
      title: 'Responsável',
      dataIndex: 'responsavel',
      key: 'responsavel',
    },
    {
      title: 'Progresso',
      dataIndex: 'progresso',
      key: 'progresso',
    },
  ];


  const columns2 = [
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Responsável',
      dataIndex: 'responsavel',
      key: 'responsavel',
    },
    {
      title: 'Progresso',
      dataIndex: 'progresso',
      key: 'progresso',
    },
  ];




  const items2 = [
    {
      label: <Badge status="success" text="Passos" />,
      key: 'passos',
      children: <Table dataSource={dataSource4} columns={columns2} />,
    }
  ];

  const fetchItems = async () => {
    await api.get(`v1/wps/${wp_id}/activities`)
      .then((response) => {
        if (response.status === 200) {
          const allData = groupByKey(response.data.data, 'type');
          const types = Object.keys(groupByKey(response.data.data, 'type'));
          var items = [];
          if (types.includes('EWP')) {
            const source = allData['EWP'].map((obj: any) => ({
              key: obj.id,
              atividades: obj.name,
              responsavel: obj.sub_discipline_name,
              progresso: <Progress percent={100} status="active" />
            }));
            items.push({
              label: <Badge status="success" text="EWP - Engenharia" />,
              key: 'ewp',
              children: <Table dataSource={source} columns={columns} />,
            })
          }
          if (types.includes('PWP')) {
            const source = allData['PWP'].map((obj: any) => ({
              key: obj.id,
              atividades: obj.name,
              responsavel: obj.sub_discipline_name,
              progresso: <Progress percent={100} status="active" />
            }));
            items.push({
              label: <Badge status="success" text="PWP - Fornecimento" />,
              key: 'pwp',
              children: <Table dataSource={source} columns={columns} />,
            })
          }
          if (types.includes('CWP')) {
            const source = allData['CWP'].map((obj: any) => ({
              key: obj.id,
              atividades: obj.name,
              responsavel: obj.sub_discipline_name,
              progresso: <Progress percent={100} status="active" />
            }));
            items.push({
              label: <Badge status="warning" text="CWP - Construção" />,
              key: 'cwp',
              children: <Table dataSource={source} columns={columns} />,
            })
          }
          setItems(items);
        }
      });
  }

  useEffect(() => {
    fetchItems();
  }, [])

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
            <Col span={24}>

              <Breadcrumb
                items={[
                  {
                    title: 'Home',
                  },
                  {
                    title: <a href="/a">KN-N1344-290 - N2 - Mina - Geral</a>,
                  },
                  {
                    title: <a href="/b">KN-N1344-290-M-EM-0001</a>,
                  }
                ]}
              />

              <Tabs
                defaultActiveKey="1"
                type="card"
                size={size}
                items={items}
                className='mt-3 fluit-tabs'
              />

              <Tabs
                defaultActiveKey="1"
                type="card"
                size={size}
                items={items2}
                className='mt-3 fluit-tabs'
              />

            </Col>
          </Row>

        </Card>
      </Layout>
    </>

  );
}

export default EwpPage;

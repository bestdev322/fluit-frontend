import { Badge, Breadcrumb, Card, Col, Progress, RadioChangeEvent, Row, Table, Tabs, Typography } from 'antd';

import './wpViewPage.scss';
import Layout from '../../components/Template/Layout';
import { useEffect, useState } from 'react';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useParams } from 'react-router';
import api from '../../services/Api';

const { Text } = Typography;

function WpViewPage() {

  const { wp_id, cwa_id } = useParams();
  const [size, setSize] = useState<SizeType>('small');
  const [items, setItems] = useState<any>([]);
  const [projectTitle, setProjectTitle] = useState('');

  const groupByKey = (list: any, key: any) => list.reduce((hash: any, obj: any) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {})

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
    api.get("/v1/wps/" + wp_id)
      .then(async (response) => {
        if (response.status === 200) {
          let project_name = '', cwa_name = '';
          await api.get("/v1/projects/" + response.data.project_id)
            .then((response) => {
              if (response.status === 200) {
                project_name = response.data.name;
              }
            });

          await api.get("/v1/cwas/" + response.data.cwa_id)
            .then((response) => {
              if (response.status === 200) {
                cwa_name = '[' + response.data.cwa_code + '] - ' + response.data.description;
              }
            });

          setProjectTitle((project_name ?? '_') + (cwa_name ? ' > ' + cwa_name : '_') + (response.data.name ? ' > ' + response.data.name : '_'))
        }
      });
    fetchItems();
  }, [])

  const items2 = [
    {
      label: <Badge status="success" text="Passos" />,
      key: 'passos',
      children: <Table dataSource={dataSource4} columns={columns2} />,
    }
  ];




  return (
    <>
      <Layout breadcrumb = {projectTitle}>
        <Card size="small" title="CWA - Áreas do Projeto" extra={''}>
          <Row>
            <Col span={24}>

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

export default WpViewPage;

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './chartsPage.scss'
import Layout from '../../components/Template/Layout';
import api from '../../services/Api';
import { Button, Card, Col, Row, Typography, Select, TableColumnsType, Input, Space, Table } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);
const { Text } = Typography;
const { Search } = Input;

interface DataType {
    key: React.Key;
    name: string;
    description: string;
}

function ChartsPage() {
    const [dataTable, setDataTable] = useState();
    const [fetchingData, setFetchingData] = useState(false);
    const { project_id } = useParams();
    const navigate = useNavigate();

    const columns: TableColumnsType<DataType> = [
        { title: 'CWAs', dataIndex: 'cwa_code', key: 'cwa_code', render: (cwa_code, record) => (<a style={{ color: 'black' }} onClick={() => navigate("/wps/" + record.key)}>{cwa_code}</a>) },
        { title: 'Status', dataIndex: 'status', key: 'status' },
    ];

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => console.log(value);

    const data1 = {
        datasets: [{
            label: 'Total',
            data: [159],
            backgroundColor: [
                '#F5B091'
            ],
            hoverOffset: 4
        }]
    };

    const data2 = {
        labels: ['NÃO INICIADOS', ''],
        datasets: [{
            data: [75, 159 - 75],
            backgroundColor: [
                '#ACACAC',
                '#F5B09145',
            ],
            hoverOffset: 4
        }]
    };

    const data3 = {
        labels: ['EM ANDAMENTO', ''],
        datasets: [{
            data: [25, 159 - 25],
            backgroundColor: [
                '#F5B091',
                '#F5B09145',
            ],
            hoverOffset: 4
        }]
    };

    const data4 = {
        labels: ['FINALIZADOS', ''],
        datasets: [{
            data: [59, 159 - 59],
            backgroundColor: [
                '#7BBC76',
                '#F5B09145',
            ],
            hoverOffset: 4
        }]
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
                <Card size="small" title="Business Inteligence - CWAs" extra={''}>
                    <Row justify={'space-between'} style={{ padding: '10px' }}>
                        <Col><Select
                            defaultValue="EWP"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            options={[
                                { value: 'EWP', label: 'EWP' },
                                { value: 'PWP', label: 'PWP' },
                                { value: 'CWP', label: 'CWP' },
                                { value: 'Atividades', label: 'Atividades' },
                                { value: 'Passos', label: 'Passos' },
                            ]}
                        /></Col>
                        <Col span={9}><Search placeholder="input search text" onSearch={onSearch} /></Col>
                    </Row>
                    <Row>
                        <Col span={24} sm={15}>
                            <Row className='chart-cards'>
                                    <Card title="TOTAL" size="small" className='pie-chart-card'>
                                        <Pie data={data1} />
                                    </Card>
                                    <Card title="NÃO INICIADOS" size="small" className='pie-chart-card'>
                                        <Pie data={data2} />
                                    </Card>
                                    <Card title="EM ANDAMENTO" size="small" className='pie-chart-card'>
                                        <Pie data={data3} />
                                    </Card>
                                    <Card title="FINALIZADOS" size="small" className='pie-chart-card'>
                                        <Pie data={data4} />
                                    </Card>
                            </Row>
                        </Col>
                        <Col span={24} sm={9}>
                            <Table
                                className='table-cwa'
                                columns={columns}
                                dataSource={dataTable}
                                loading={fetchingData}
                                pagination={false}
                                scroll={{ y: 350 }}
                                locale={{ emptyText: 'Sem dados' }}
                                size='small'
                            />
                        </Col>
                    </Row>
                </Card>
            </Layout>
        </>
    );
}

export default ChartsPage;
